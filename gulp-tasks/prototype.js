/**  # Prototype

*/
module.exports = function(gulp, plugins, config, browserSync, onError) {
  var fsRecurs = require('fs-readdir-recursive');
  var util = require('util');
  var _ = require('lodash');
  var spy = require("through2-spy");
  var rename = require("gulp-rename");
  // https://nodejs.org/docs/latest/api/path.html#path_path_basename_path_ext
  var path = require('path');
  // https://nodejs.org/docs/latest/api/fs.html
  var fs = require('fs');
  // Navigation builder
  // https://www.npmjs.com/package/gulp-nav
  var nav= require('gulp-nav');
  // Markdown wrappers
  // https://www.npmjs.com/package/nunjucks-markdown
  // https://www.npmjs.com/package/gulp-marked [deprecated] cd gulp-markdown
  // On utilise marked directement
  // Une alternative envisageable https://www.npmjs.com/package/showdown
  var marked = require('marked');
  // https://www.npmjs.com/package/gulp-data
  var data = require('gulp-data');
  // Gulp-wrap permet d'assembler les data et les templates en appliquant au final render
  // Utilise consolidate, ce qui peut fausser la definitions des path
  // https://www.npmjs.com/package/consolidate
  // https://www.npmjs.com/package/gulp-wrap
  var wrap = require('gulp-wrap');
  // https://www.npmjs.com/package/gulp-gray-matter
  // https://www.npmjs.com/package/gray-matter#options
  // On utilise gray-matter et non le plugin gulp
  var matter = require('gray-matter');
  // Templating
  // Nunjuks wrapper for gulp : https://www.npmjs.com/package/gulp-nunjucks-render
  // https://www.npmjs.com/package/nunjucks
  // https://mozilla.github.io/nunjucks/
  var nunjucks = require('nunjucks');
  // Html minification
  // https://www.npmjs.com/package/gulp-htmlmin
  var htmlmin = require('htmlmin');

  /* Nunjuks loader

   On cree un loader pour l'héritages des templates
   soit relatif au premier niveau du template demandé
   et non a la racine du projet

   https://mozilla.github.io/nunjucks/fr/api.html#filesystemloader

  FileSystemLoader([searchPaths], [opts])
  */
  var loader = new nunjucks.FileSystemLoader(config.nunjuks.searchPaths,{
    noCache : true
  });

  function getJSONDataFile(filePath){
      if(fs.existsSync(filePath))
          return JSON.parse(fs.readFileSync(filePath));
      else
          console.log('No file found for :' + filePath);
  }

    var summaryJSON = {} ;

    function buildIndex(baseDir, objectType){
        var counter = 0 ;
        files = fsRecurs(baseDir);
        files.map(function(url,ind,arr){
            //current = fs.readFileSync(pageDir + url, 'utf-8')
            file = matter.read(baseDir + url);

            //url =  path.dirname(file.path).replace(config.pageDir, '') + path.basename(file.path,'.md') + '.html';
            // slice enlève le dernier / présent dans
            url = path.dirname(file.path).replace(baseDir.slice(0,-1), '') + '/'+ path.basename(file.path,'.md') + '.html';
            //console.log(url);

           summaryJSON[objectType + '-' + counter] = {
                'path': file.path,
                'url': url,
                'title': file.data.title,
                'description': file.data.description
            };

            counter++;
        });

        return  summaryJSON;
    }

    let datasPath = config.SrcPath + _DATAS_DIR;

    return function (){
        // Parse page dir and *.md files recursively
        gulp.src(config.SrcPath + _PAGES_DIR + '**/*.md')
            // Error Handler
            // .pipe(plugins.plumber({
            //     errorHandler: onError
            // }))
            .pipe(data(function(file) {
                var data = {};
                var xtra = {};
                if (file.data) {
                  data = _.merge({},file.data, data);
                  // or just data = file.data if you don't care to merge. Up to you.
                }
                // Y'a t'il un fichier json de datas supplémentaires a fournir
                if(fs.existsSync(datasPath + path.basename(file.path,'.md') + '.json')) {
                    data.datas = JSON.parse(fs.readFileSync(datasPath + path.basename(file.path,'.md') + '.json'));
                    console.log('YES : Json file found for :' + file.path);
                }
                else {
                    data.datas = null;
                    console.log('No Json file found for :' + file.path);
                }
                // injecter les settings/datas disponibles ensuites dans les templates
                // assets, locals,
                data = _.merge({},data, {
                    bundle: getJSONDataFile(datasPath + config.bundleConfig.fileName + '.json'),
                    app : getJSONDataFile(datasPath + 'app.json'),
                    locals : getJSONDataFile(datasPath + 'locals.json'),
                    // test: {
                    //   bundleFileName: getJSONDataFile(datasPath + config.bundleConfig.fileName + '.json'),
                    //   some: ['elements','elements']
                    // }
                    //summary: buildIndex(datasPath,'page')
                });
                // On extrait et sépare entete/contenu
                // Extract/split file datas  extrac content|frontmatter
                var frontmatter = matter.read(file.path);

                // Les datas du frontmatter doivent êtres accessibles
                // au premier niveau de file.data pour être correctements utilisées par gulp-wrap, gulp-nav
                // et être propagées dans l'héritage des templates
                data = _.merge({},data,frontmatter.data);
                // merge xtra + frontmatter
                // data = assignIn(data.environement, frontmatter.data);

                // Nunjuk.config pour les partials utilisées dans le content
                nunjucks.configure(config.templateDir);
                var compile = new nunjucks.Environment(loader);

                // On traite les data avec nunjuks.renderString
                // On applique le rendu nunjuk (data , partials) au content
                // on utilise gulp-wrap pour mettre a jour file.content
                file.contents = new Buffer.from(compile.renderString(frontmatter.content.toString(), data));

                marked.setOptions({
                    highlight: function (code) {
                        return require('highlight.js').highlightAuto(code).value;
                    }
                });

                marked(file.contents.toString(), config.markedConfig, function(err,data){
                    file.contents = new Buffer.from(data);
                });

                return data;
            }))
            // Navigation construct
            .pipe(nav())
            // wrap
            .pipe(wrap(function(data) {
                  var templatesPath = _BASE_PATH + _SRC_DIR + _TEMPLATES_DIR;
                  if(fs.existsSync(templatesPath + data.layout + config.nunjuks.templateExt)) {
                      var template = fs.readFileSync(templatesPath + data.layout + config.nunjuks.templateExt).toString();
                      return template;
                  }else {
                      return fs.readFileSync(templatesPath + 'page' + config.nunjuks.templateExt).toString();
                  }
                },
                function(file){
                      //file.data = assignIn(file.data,{
                      //    navigation: file.data.nav
                      //});
                      //console.log(file.data);
                      return file.data;
                  },{// Options : https://github.com/tj/consolidate.js/blob/master/lib/consolidate.js#L1118
                      engine: 'nunjucks',
                      nunjucksEnv: '',
                      loader: loader // @see loader
                  }
            ))
            .pipe(spy.obj(function(file) {
                console.log('-------------------------');
                console.log(file.data);
            }))
            .pipe(rename({
                extname: ".html"
            }))
            // .pipe(_if(function(){
            //     if(getEnv(config) == 'production')
            //       return true;
            //   },htmlmin({
            //     // https://github.com/kangax/html-minifier
            //     collapseWhitespace: true
            //   })
            // ))
            // Output
            // ------
            //.pipe(gulp.dest(project.DevPath+project.cssPath))  // /!\ Attention on copie en Dev alors que Autoprefixer et combine mediaQueries ne sont pas passés
            .pipe(gulp.dest(config.BuildPath))
            .pipe(browserSync.stream())
            // .pipe(plugins.notify('Task::Prototype DONE'));
    };
};

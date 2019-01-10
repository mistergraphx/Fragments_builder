/**  # Prototype

*/
module.exports = function(gulp, plugins, config, browserSync, onError) {
  var fsRecurs = require('fs-readdir-recursive');
  var through = require('through2');
  var util = require('util');
  var _ = require('lodash');
  var spy = require("through2-spy");
  var rename = require("gulp-rename");
  // Error Handling
  var PluginError = require('plugin-error');
  // https://nodejs.org/docs/latest/api/path.html#path_path_basename_path_ext
  var path = require('path');
  // https://nodejs.org/docs/latest/api/fs.html
  var fs = require('fs');
  // Navigation builder
  // https://www.npmjs.com/package/gulp-nav
  var nav = require('gulp-nav');
  // Markdown wrappers
  // https://www.npmjs.com/package/nunjucks-markdown
  // https://www.npmjs.com/package/gulp-marked [deprecated] cd gulp-markdown
  // On utilise marked directement
  // Une alternative envisageable https://www.npmjs.com/package/showdown
  var marked = require('marked');
  // https://www.npmjs.com/package/gulp-data
  var data = require('gulp-data');

  // @remove
  // Gulp-wrap permet d'assembler les data et les templates en appliquant au final render
  // Utilise consolidate, ce qui peut fausser la definitions des path
  // https://www.npmjs.com/package/consolidate
  // https://www.npmjs.com/package/gulp-wrap
  // var wrap = require('gulp-wrap');
  // var consolidate = require('consolidate');

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

  // Nunjuks loader
  // Créer un loader pour que l'héritages des templates
  // soit relatif au premier niveau du template demandé
  // et non a la racine du projet
  //
  // https://mozilla.github.io/nunjucks/fr/api.html#filesystemloader
  //
  // FileSystemLoader([searchPaths], [opts])
  var loader = new nunjucks.FileSystemLoader(config.nunjuks.searchPaths,{
    noCache : true
  });
  // Rnvironnement Configurer les options depuis la config
  // modifiable/extensible depuis le projet
  var njk = new nunjucks.Environment(loader,config.nunjuks.options);
  // Filters
  // https://www.npmjs.com/package/slug
  var slug = require("slug");
  njk.addFilter('slug', function(str,options) {
      return slug(str);
  });
  // add nunjucks to requires so filters can be
// added and the same instance will be used inside the render method
// consolidate.requires.nunjucks = nunjucks.configure();
// consolidate.requires.nunjucks.addFilter('slug', function(str,options) {
//     return slug(str);
// });

  let datasPath = config.SrcPath + _DATAS_DIR;

  // @param file - nom du fichier sans ext
  // @return Object
  function getDatas(file){
      var filePath = datasPath + file + '.json';
      if(fs.existsSync(filePath))
          return JSON.parse(fs.readFileSync(filePath));
      else
          console.log('No file found for :' + filePath);
  }

    var summaryJSON = {} ;
    // @unused
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

    return function (){
        // Parse pages/**/*.md files recursively
        gulp.src(config.SrcPath + _PAGES_DIR + '**/*.md')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(data(function(file) {
                // Env gulp Data Object
                var env = {};

                if (file.env) {
                  data = _.merge({},file.env, data);
                }
                // Y'a t'il un fichier json de datas supplémentaires a fournir
                if(fs.existsSync(datasPath + path.basename(file.path,'.md') + '.json')) {
                    env.datas = getDatas(path.basename(file.path,'.md'));
                    console.log('YES : Json file found for :' + file.path);
                }
                else {
                    env.datas = null;
                    console.log('No Json file found for :' + file.path);
                }
                // injecter les settings/datas disponibles ensuites dans les templates
                // assets, locals,
                env = _.merge({},env, {
                    bundle: getDatas(config.bundleConfig.fileName),
                    app : getDatas('app'),
                    locals : getDatas('locals')
                });
                // On extrait et sépare entete/contenu
                // Extract/split file datas  extrac content|frontmatter
                var frontmatter = matter.read(file.path);
                // assigner tout de suite {{contents}}
                env.contents = frontmatter.content.toString();
                // Les datas du frontmatter doivent êtres accessibles
                // au premier niveau de file.data pour être correctements utilisées par gulp-wrap, gulp-nav
                // et être propagées dans l'héritage des templates
                env = _.merge({},env,frontmatter.data);
                // On traite les data avec nunjuks.renderString
                // On applique le rendu nunjuk (data , partials) au content
                // on utilise gulp-wrap pour mettre a jour file.content
                rendered = njk.renderString(env.contents, env);
                // Traiter le markdwon avec Marked
                // Options/extensions Marked
                marked(rendered, config.markedConfig, function(err,res){
                    if(err){
                      return console.log('Marked error in :' + file.path);
                    }
                    return env.contents = res;
                });

                return env;
            }))
            // Navigation construct
            .pipe(nav())
            // Générer la page
            .pipe(through.obj(function (file, enc, cb) {

                if (file.isNull()) {
                  cb(null, file);
                  return;
                }

                if (file.isStream()) {
                  cb(new PluginError('nunjucks', 'Streaming not supported'));
                  return;
                }
                // Recupérer les gulp-data
                var env = file.data;
                //  reccupérer le template défini dans l'entete du fichier md sinon page
                var templatesPath = config.nunjuks.defaultTemplatesPath,
                    ext= config.nunjuks.templateExt;
                if(fs.existsSync(templatesPath + env.layout + ext)) {
                    var template = fs.readFileSync(templatesPath + env.layout + ext).toString();
                }else{
                    var template = fs.readFileSync(templatesPath + 'page' + ext).toString();
                }

                return njk.renderString(template,env,function (err, res) {
            			if (err) return this.emit('error', new PluginError('nunjucks', err, { fileName: file.path }));
            			file.contents = Buffer.from(res || '');
            			this.push(file);
            			cb();
            		}.bind(this));

            	})
            )
            // .pipe(spy.obj(function(file) {
            //     console.log('-------------------------');
            //     console.log('ENV', file.data);
            // }))
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

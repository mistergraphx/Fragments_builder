/** # gulp-nunjuks

http://mozilla.github.io/nunjucks/templating.html
https://www.npmjs.com/package/gulp-nunjucks


- load all .twig templates at the root of the project.srcPtah/templates folder -> pages
- template inherance : all the _layouts.twig are placed in the /_layout folder
- organised partials in the /_partials folder
- Load a page_name.json if it's found in the /datas folder
- load basics form the /datas/app.json file find in the datas folder
- Render Markdown with | markdown filter or {% markdown%} {% endmarkdown %}
- Render html files in the root of the project.srcPath



gulp-htmlmin
https://www.npmjs.com/package/gulp-htmlmin




On pourra aussi envisager de passer a un workflow similaire a Jekyll, comme sur expliqué ici :
http://stackoverflow.com/questions/32810072/gulp-front-matter-markdown-through-nunjucks

Permet d'assembler les data et template
https://www.npmjs.com/package/gulp-wrap

*/

// Templating
// Nunjuks wrapper for gulp : https://www.npmjs.com/package/gulp-nunjucks-render
// https://www.npmjs.com/package/nunjucks
// https://mozilla.github.io/nunjucks/
var nunjucks = require('nunjucks');

// https://www.npmjs.com/package/gulp-data
var data = require('gulp-data');
// Gulp-wrap permet d'assembler les data et les templates en appliquant au final render
// Utilise consolidate, ce qui peut fausser la definitions des path
// https://www.npmjs.com/package/consolidate
// https://www.npmjs.com/package/gulp-wrap
var wrap = require('gulp-wrap');
// https://www.npmjs.com/package/gulp-gray-matter
// https://www.npmjs.com/package/gray-matter#options
var frontmatter = require('gulp-gray-matter');

// Markdown wrappers
// https://www.npmjs.com/package/nunjucks-markdown
// https://www.npmjs.com/package/gulp-marked
var marked = require('gulp-marked');

// Navigation builder
// https://www.npmjs.com/package/gulp-nav
var nav= require('gulp-nav');

module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError){
    
    var loader = new nunjucks.FileSystemLoader(project.templateDir);

    function getJSONDataFile(filePath){
        if(fs.existsSync(filePath))
            return JSON.parse(fs.readFileSync(filePath));
        else
            console.log('No file found for :' + filePath);
    }
    
    
    return function(){

        

        gulp.src('src/pages/**/*.md')
            // Y'a t'il un fichier json de datas supplémentaires a fournir
            //.pipe(data(function(file) {
            //    if(fs.existsSync(project.dataDir + path.basename(file.path,'.md') + '.json'))
            //        return fs.readFileSync(project.dataDir + path.basename(file.path,'.md') + '.json');
            //    else
            //        console.log('No Json file found for :' + file.path);
            //}))
            // On extrait et sépare entete/contenu
            //.pipe(frontmatter(project.frontmatterConfig))
            //// Navigation construct
            ////.pipe(nav())
            //// On traite le markdown
            //.pipe(marked(project.markedConfig))
            //.pipe(wrap(function(data) {
            //                return fs.readFileSync(project.templateDir + data.layout + project.templateExt).toString();
            //            },
            //            function(data){
            //                var extra = {
            //                    assets: getJSONDataFile(project.dataDir + project.bundleResults.fileName + '.json'),
            //                    app : getJSONDataFile(project.dataDir + 'app.json'),
            //                    summary: buildIndex(pageDir,'page'),
            //                    navigation: data.nav
            //                };
            //                //console.log(extra.navigation)
            //                return extra;
            //            },{// Options : https://github.com/tj/consolidate.js/blob/master/lib/consolidate.js#L1118
            //                engine: 'nunjucks',
            //                nunjucksEnv:'',
            //                loader: loader // @see loader
            //            }
            //))
        .pipe(gulp.dest(project.buildDir));

    };
        
        
        
};
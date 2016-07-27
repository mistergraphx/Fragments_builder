/** # gulp-swig

- load all .twig templates at the root of the project.srcPtah/templates folder -> pages
- template inherance : all the _layouts.twig are placed in the /_layout folder
- organised partials in the /_partials folder
- Load a page_name.json if it's found in the /datas folder
- load basics form the /datas/app.json file find in the datas folder
- Render Markdown with | markdown filter or {% markdown%} {% endmarkdown %}
- Render html files in the root of the project.srcPath

https://www.npmjs.org/package/gulp-swig
https://www.npmjs.org/package/gulp-data

Swig Doc : http://paularmstrong.github.io/swig/docs/

Swig Marked
https://www.npmjs.com/package/swig-marked
https://github.com/chjj/marked
https://help.github.com/articles/github-flavored-markdown/

gulp-htmlmin
https://www.npmjs.com/package/gulp-htmlmin

/!\ Swig n'est plus maintenu, par son créateur, le fork swig-template n'as pas l'air de bouger

Alternatives envisageables :
http://mozilla.github.io/nunjucks/templating.html
https://www.npmjs.com/package/gulp-nunjucks
https://www.npmjs.com/package/gulp-twig

On pourra aussi envisager de passer a un workflow similaire a Jekyll, comme sur expliqué ici :
http://stackoverflow.com/questions/32810072/gulp-front-matter-markdown-through-nunjucks

*/

module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError, marked){
    
    return function(){
        
        var markedConfig = marked.configure({
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
        });
        

        
        var opts = {
            load_json: true,
            json_path: project.SrcPath+"datas/",
            defaults: {
                cache: false,
                locals: {
                    // i118n here
                }
            },
            data: {
                config : project,
                app : require('../'+project.SrcPath+'datas/app.json') ,
                summary: require('../'+project.SrcPath+'datas/summary.json'),
            },
            setup: function(swig) {
                marked.useTag(swig, 'markdown');
                marked.useFilter(swig, 'markdown');
            }
        };

        gulp.src(project.SrcPath+"/templates/*.twig")
            .pipe(plugins.plumber({
                    errorHandler: onError
            }))
            .pipe(plugins.swig(opts))
            .pipe(plugins.htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(project.BuildPath))
            .pipe(plugins.notify({
                title: "SWIG TASK",
                message: "Swig/Html is rendered"
            }))
            .on("end", browserSync.reload);
    }
};
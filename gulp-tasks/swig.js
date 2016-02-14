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
            .pipe(gulp.dest(project.SrcPath))
            .pipe(plugins.notify({
                title: "SWIG TASK",
                message: "Swig/Html is rendered"
            }))
            .on("end", browserSync.reload);
    }
};
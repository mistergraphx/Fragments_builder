/** # Wireframe

https://github.com/LesDeveloppementsDurables/css-wireframes




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
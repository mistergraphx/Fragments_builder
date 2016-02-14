/** # combineMQ

@requires   gulp-combine-media-queries
@see        https://www.npmjs.com/package/gulp-combine-media-queries

@see  Autre source : https://github.com/SE7ENSKY/group-css-media-queries

*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError){
    return function(){
        gulp.src(project.SrcPath+project.cssPath+'**/*.css')
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(plugins.combineMediaQueries({
                    log: true,
                    use_external: false
                })
            )
        .pipe(gulp.dest(project.DevPath+project.cssPath))
        .pipe(plugins.notify('MediaQueries combined !'));
    }
};
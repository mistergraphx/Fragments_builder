/** # combineMQ

Wed Jul 27 13:05:41 2016: changement pour   gulp-merge-media-queries	

@requires   gulp-merge-media-queries
@see        https://www.npmjs.com/package/gulp-merge-media-queries

*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError){
    return function(){
        
        gulp.src(project.SrcPath+project.cssPath+'**/*.css')
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(plugins.mergeMediaQueries({
                log: true
            }))
            .pipe(gulp.dest(project.BuildPath+project.cssPath))
            .pipe(plugins.notify('MediaQueries combined !'));
    }
};
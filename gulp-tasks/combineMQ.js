/** # combineMQ

@requires   gulp-group-css-media-queries
@see        https://www.npmjs.com/package/gulp-group-css-media-queries
@see        https://github.com/SE7ENSKY/group-css-media-queries

*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError){
    return function(){
        
        gulp.src(project.SrcPath+project.cssPath+'**/*.css')
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(plugins.groupCssMediaQueries())
        .pipe(gulp.dest(project.DevPath+project.cssPath))
        .pipe(plugins.notify('MediaQueries combined !'));
    }
};
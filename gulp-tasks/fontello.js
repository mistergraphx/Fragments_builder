/**  # Fontello

Fontello wrapper for gulp.

@see http://fontello.com/
@see https://www.npmjs.com/package/gulp-fontello
@see https://github.com/gillbeits/gulp-fontello
*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError,importOnce) {
    return function (){
        gulp.src(project.SrcPath+'assets/fonts/icons/config.json')
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(plugins.fontello({
                host:       'http://fontello.com',
                font:       'fonts', // Destination dir for Fonts and Glyphs      
                css:        'css',  // Destination dir for CSS Styles,
                assetsOnly: true    // extract from ZipFile only CSS Styles and Fonts exclude config.json, LICENSE.txt, README.txt and demo.html
            }))
            .pipe(gulp.dest(project.SrcPath+'assets/icons/'))
            .pipe(plugins.notify('Icon font task is done'));
    };
};

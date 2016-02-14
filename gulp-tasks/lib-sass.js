/**  # Lib-SASS

Compilation de Fichiers scss
avec LibSass

- sourcemaps
- reload

@requires       node-sass
@see            https://github.com/sass/node-sass
@requires       gulp-sass
@see            https://www.npmjs.org/package/gulp-sass
@requires       gulp-source-maps
@see            https://www.npmjs.com/package/gulp-sourcemaps

*/

module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError) {
    return function (){
        gulp.src(project.SrcPath + project.sassPath+'**/*.scss')
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            .pipe(plugins.sass({
                errLogToConsole: true,
                outputStyle: project.sassOptions.outputStyle, // compressed | nested
                //sourceComments:'none',
                //sourceMap:'sass',
                includePaths : project.includePaths
            }))
            // Ici on écrit la sourcemap par défaut dans le fichier
            // comme expliqué [ici](http://www.sitepoint.com/simple-gulpy-workflow-sass/)
            // Si besoin on peut spécifier un chemin, et des options supplémentaires pour une sourcemap externe
            // cf : https://www.npmjs.com/package/gulp-sourcemaps
            .pipe(sourcemaps.write())
            //.pipe(gulp.dest(project.DevPath+project.cssPath))  // /!\ Attention on copie en Dev alors que Autoprefixer et combine mediaQueries ne sont pas passés
            .pipe(gulp.dest(project.SrcPath+project.cssPath))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Sass Files Compiled'));
    };
};

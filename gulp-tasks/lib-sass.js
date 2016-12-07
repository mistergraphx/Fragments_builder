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
    
    // on initialise la variable par default pour le chemin des sourcemaps
    // par defaut vide pour les sourcemaps inlines
    var sourcemapsPath = '';
    
    // Test si la config du projet a ces propriétées de definies
    if(project.hasOwnProperty("sourcemaps")
       && project.hasOwnProperty("sourcemaps.path")
       && project.sourcemaps !== 'undefined') {
            sourcemapsPath = project.sourcemaps.path;
    }
    
    if(process.env.NODE_ENV === 'production'){
        sourcemapsPath = './';
    }
    
    return function (){
        gulp.src(project.SrcPath + project.sassPath+'**/*.scss')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            // Sourcemaps initialisation
            .pipe(sourcemaps.init({
                debug: true
            }))
            // Sass
            .pipe(plugins.sass({
                errLogToConsole: true,
                outputStyle: project.sassOptions.outputStyle, // compressed | nested
                //sourceComments:'none',
                //sourceMap:'sass',
                includePaths : project.includePaths
            }))
            // Source map
            // ----------
            // Ici on écrit la sourcemap par défaut dans le fichier
            // ceci permet de pouvoir avoir un chemin d'accès correct sous chrome
            // comme expliqué [ici](http://www.sitepoint.com/simple-gulpy-workflow-sass/)
            // conflit avec Suzy : https://github.com/floridoo/gulp-sourcemaps/issues/144#issuecomment-229044077
            //
            // Si besoin on peut spécifier un chemin, et des options supplémentaires pour une sourcemap externe
            // cf : https://www.npmjs.com/package/gulp-sourcemaps
            .pipe(sourcemaps.write(sourcemapsPath))
            // Output
            // ------
            //.pipe(gulp.dest(project.DevPath+project.cssPath))  // /!\ Attention on copie en Dev alors que Autoprefixer et combine mediaQueries ne sont pas passés
            .pipe(gulp.dest(project.SrcPath+project.cssPath))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Sass Files Compiled'));
    };
};

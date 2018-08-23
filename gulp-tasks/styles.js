/**  # Lib-SASS

Compilation de Fichiers scss
avec LibSass
si le NODE_ENV est production les sourcemaps sont externes,
par default au même niveau que la css généré,
on peut spécifier un autre chemin dans le fichier de config du projet

    sourcemaps: {
        path: ''
    }

- sourcemaps
- reload

@requires       node-sass
@see            https://github.com/sass/node-sass
@requires       gulp-sass
@see            https://www.npmjs.org/package/gulp-sass
@requires       gulp-source-maps
@see            https://www.npmjs.com/package/gulp-sourcemaps

*/
var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7.1',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError) {
    
    
    
    return function (){
        gulp.src(project.SrcPath + project.sassPath+'**/*.scss')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            // Sourcemaps initialisation
            .pipe(sourcemaps.init())
            // Sass
            .pipe(plugins.sass({
                errLogToConsole: true,
                outputStyle: project.sassOptions.outputStyle, // compressed | nested
                //sourceComments:'none',
                //sourceMap:'sass',
                includePaths : project.includePaths
            }))
			.pipe(sourcemaps.write({includeContent: true}))
			.pipe(sourcemaps.init())
			.pipe(plugins.autoprefixer({
                browsers: AUTOPREFIXER_BROWSERS,
                cascade: false
            }))
            .pipe(sourcemaps.write())
            // Output
            // ------
            //.pipe(gulp.dest(project.DevPath+project.cssPath))  // /!\ Attention on copie en Dev alors que Autoprefixer et combine mediaQueries ne sont pas passés
            .pipe(gulp.dest(project.SrcPath+project.cssPath))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Sass Files Compiled'));
    };
};

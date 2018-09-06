/**  # Styles

- Preprocessing Sass
- Post css:
  - Autoprefixer
  - mqpacker : combine les media queries
- Sourcemaps


*/
module.exports = function(gulp, plugins, config, browserSync, onError) {
  let postcss = require('gulp-postcss'),
      sourcemaps = require('gulp-sourcemaps');

  return function (){
        gulp.src(config.SrcPath + _SASS_DIR + '**/*.scss')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            // Sass
            .pipe(plugins.sass(config.sass))
            // PostCSS
            .pipe(postcss([
          			require("autoprefixer")(config.autoprefixer),
                require("css-mqpacker")(config.mqpacker)
    	        ]))
            .pipe(sourcemaps.write('./', {
      				//includeContent: false,
      				sourceRoot: '../_scss',
      				destPath: config.bundleConfig.dest ,
      				//sourceMappingURLprefix: config.bundleConfig.dest + 'assets/css'
      			}))
            // Output
            // ------
            //.pipe(gulp.dest(project.DevPath+project.cssPath))  // /!\ Attention on copie en Dev alors que Autoprefixer et combine mediaQueries ne sont pas passés
            .pipe(gulp.dest(config.SrcPath + _CSS_DIR))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Sass Files Compiled'));
    };
};

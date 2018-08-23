
var gulp    = require('gulp');


function test(){
    return gulp.src(project.SrcPath + project.sassPath+'**/*.scss')
          // Error Handler
          .pipe(plugins.plumber({
              errorHandler: onError
          }))
          // Sass
          .pipe(plugins.sass({
              errLogToConsole: true,
              outputStyle: project.sassOptions.outputStyle, // compressed | nested
              //sourceComments:'none',
              //sourceMap:'sass',
              includePaths : project.includePaths
          }))
          .pipe(gulp.dest(project.SrcPath+project.cssPath));
}

gulp.task('test', test);

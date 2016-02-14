/** # autoprefixer

@requires   gulp-autoprefixer
@see        https://www.npmjs.com/package/gulp-autoprefixer
@see        https://www.npmjs.com/package/postcss
@see        Command lines for PostCSS : https://github.com/code42day/postcss-cli

Remove unecessary vendor-prefixs,
add those specified in the compatibility array AUTOPREFIXER_BROWSERS


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

module.exports = function(gulp, plugins, project){
    return function(){
        gulp.src(project.SrcPath+project.cssPath+'**/*.css')
            .pipe(plugins.autoprefixer({
                browsers: AUTOPREFIXER_BROWSERS,
                cascade: false
            }))
            .pipe(gulp.dest(project.DevPath+project.cssPath));
    }
};
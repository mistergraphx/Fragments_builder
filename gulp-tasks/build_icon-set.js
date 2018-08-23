/**  # Build icon system

Création d'un icon system
- sprite svg depuis un dossier de fichiers svg.
- fallback
- création des css et classes



@require gulp-svg-sprites - https://www.npmjs.com/package/gulp-svg-sprites
@see  - https://www.npmjs.com/package/gulp-svg-sprites#options

*/

var svgSprite = require("gulp-svg-sprites");

var basePath = './svgTest/'
var svgSourcePath= basePath + '_src/svg/' ;
var iconSystemDest= basePath + 'build/' ;

// https://www.npmjs.com/package/gulp-svg-sprites#options
var svgSpriteOptions = {
    mode: "sprite", // sprite|defs|symbols
    common: "icon",
    selector: "%f",
    layout: "vertical", // horizontal|diagonal
    svgId: "%f",
    cssFile: "scss/_sprite.css",
    baseSize: 64,
    templates: {
       scss: true
    },
    // Custom files names
    svg: {
        sprite: "socialshare.svg"
    },
    preview: { // or false
        sprite: "index.html"
    },
};

module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError) {

    return function (){
        gulp.src(svgSourcePath+'**/*.svg')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            //
            .pipe(svgSprite(svgSpriteOptions))
            // Output
            // ------
            .pipe(gulp.dest(iconSystemDest))

    };
};

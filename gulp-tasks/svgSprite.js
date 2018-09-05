/**  # Build icon system

Création d'un icon system
- sprite svg depuis un dossier de fichiers svg sources.
- fallback
- création des css et classes

Le template du fichier scss est personalisable depuis gulp-task/tmpl/

@require gulp-svg-sprites - https://www.npmjs.com/package/gulp-svg-sprites
@see  - https://www.npmjs.com/package/gulp-svg-sprites#options
@todo - personalisation du template de la demo https://github.com/shakyShane/gulp-svg-sprites/blob/master/tmpl/preview.html

*/
module.exports = function(gulp, plugins, config, sourcemaps, browserSync, onError) {
    var svgSprite = require("gulp-svg-sprites");

    var svgSourcePath = config.svgSprite.sourcesPath ;
    var spriteDest = config.svgSprite.spriteDest ;

    return function (){
        gulp.src(svgSourcePath + '**/*.svg')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            //
            .pipe(svgSprite(config.svgSprite.options))
            // Output
            // ------
        .pipe(gulp.dest(spriteDest))
    };
}

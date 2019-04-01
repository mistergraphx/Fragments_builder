/**  # Build icon system

Création d'un icon system
- Optimisation nettoyage des svg avec imageOptim => svgo
Les traitements sur les svg sont modifiable dans le fichier de config du projet
spécifiquement via la config `svgSprite.svgoPlugins`
- sprite svg depuis un dossier de fichiers svg sources.
- fallback
- création des css et classes

Le template du fichier scss est personalisable depuis gulp-task/tmpl/

@require gulp-svg-sprites - https://www.npmjs.com/package/gulp-svg-sprites
@require gulp-imagemin
@see  - https://www.npmjs.com/package/gulp-svg-sprites#options
@todo - personalisation du template de la demo https://github.com/shakyShane/gulp-svg-sprites/blob/master/tmpl/preview.html

*/
module.exports = function(gulp, plugins, config, sourcemaps, browserSync, onError) {
    var svgSprite = require("gulp-svg-sprites");
    var imagemin = require("gulp-imagemin");

    var svgSourcePath = config.svgSprite.sourcesPath ;
    var spriteDest = config.svgSprite.spriteDest ;

    return function (){
        gulp.src(svgSourcePath + '**/*.svg')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            // netoyer les svg
            // https://www.npmjs.com/package/gulp-imagemin
            // https://github.com/svg/svgo#what-it-can-do
            .pipe(imagemin(
                imagemin.svgo(config.svgSprite.svgoPlugins)
            ))
            //
            .pipe(svgSprite(config.svgSprite.options))
            // Output
            // ------
        .pipe(gulp.dest(spriteDest))
    };
}

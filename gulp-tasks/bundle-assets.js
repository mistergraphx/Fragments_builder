/** Bundle Assets

Construit un bundle des style et js
a partir des informations fournies dans le fichier `app.js`
situé a la racine du projet.

Produit un fichier datas/bundle.result.json, exploitable ensuite par les templates engines

@file   gulp-tasks/bundle.js
@param  gulp
@param  plugins - plugins chargés par gulp-load-plugin
@param  project - object infos du projet en cours
@see    https://www.npmjs.com/package/gulp-bundle-assets
@see    https://github.com/dowjones/gulp-bundle-assets/blob/master/examples/full/bundle.config.js

*/
module.exports = function(gulp, plugins, config, browserSync, onError) {
    return function(){
        gulp.src(config.BasePath+'app.js') // Load Bundle.config file [bundle,copy]
            .pipe(plugins.bundleAssets())
            .pipe(plugins.bundleAssets.results({
                dest: config.SrcPath+'datas/', // destination of bundle.result.json
                pathPrefix: config.bundleConfig.pathPrefix
            }))
            .pipe(plugins.cached('bundle-assets'))
            .pipe(gulp.dest(config.bundleConfig.dest))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Bundle is ready !'));
    };
};

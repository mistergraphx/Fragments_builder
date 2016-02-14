/** Bundle Assets

Construit un bundle des style et js
a partir des informations fournies dans le fichier `bundle.config.js`
situé a la racine du projet.

Produit un fichier datas/bundle.result.json, exploitable ensuite par swig

@file   gulp-tasks/bundle.js
@param  gulp
@param  plugins - plugins chargés par gulp-load-plugin
@param  project - object infos du projet en cours
@see    https://www.npmjs.com/package/gulp-bundle-assets
*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError) {
    return function(){
        gulp.src(project.BasePath+'bundle.config.js')
            .pipe(plugins.bundleAssets())
            .pipe(plugins.bundleAssets.results(project.SrcPath+'datas/')) // arg is destination of bundle.result.json
            .pipe(plugins.cached('Bundle-assets'))
            .pipe(gulp.dest(project.bundleConfig.dest))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Bundle is ready !'));
    };
};

/** Bundle Assets

Construit un bundle des style et js
a partir des informations fournies dans le fichier `app.js`
situé a la racine du projet.

Configurer les options :

https://github.com/dowjones/gulp-bundle-assets/blob/master/examples/full/bundle.config.js#L86


clean-css :
https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
https://github.com/jakubpawlowicz/clean-css#important-40-breaking-changes
~~keepSpecialComments~~ in latest version renamed specialComments

Basic bundles config :

```javascript

bundle: {
    'assets/css/main':{
        styles:[
            './_KITCHEN/__APP_NAME__/_src/assets/css/main.css'
        ],
        options: {
            useMin: false,
            uglify: false,
            rev:false,
            maps:false
        }
    },
    'assets/js/plugins': {
        scripts: [
              './_JS_LIBS/picturefill/src/picturefill.js',
        ],
        options: {
          useMin: false,
          uglify: false,
          rev:false,
          maps:false        
        }
    },
    'assets/js/main': {
      scripts: [
        './_KITCHEN/__APP_NAME__/_src/assets/js/main.js',
      ],
      options: {
        useMin: false,
        uglify: false,
        rev:false,
        maps:false
      }
    }
},
copy: [
    {
        src: [
        //
        ],
        base: './_KITCHEN/__APP_NAME__/_src/',
        watch:true
    }
]


```

Produit un fichier datas/bundle.result.json, exploitable ensuite par swig

@file   gulp-tasks/bundle.js
@param  gulp
@param  plugins - plugins chargés par gulp-load-plugin
@param  project - object infos du projet en cours
@see    https://www.npmjs.com/package/gulp-bundle-assets
@see    https://github.com/dowjones/gulp-bundle-assets/blob/master/examples/full/bundle.config.js

*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError) {
    return function(){
        gulp.src(project.BasePath+'app.js') // Load Bundle.config file [bundle,copy]
            .pipe(plugins.bundleAssets())
            .pipe(plugins.bundleAssets.results(project.SrcPath+'datas/')) // arg is destination of bundle.result.json
            .pipe(plugins.cached('bundle-assets'))
            .pipe(gulp.dest(project.bundleConfig.dest))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Bundle is ready !'));
    };
};

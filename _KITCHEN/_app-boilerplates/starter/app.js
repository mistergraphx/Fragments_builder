/** # __APP_NAME__

*/
var prodLikeEnvs = ['production', 'staging'];

module.exports = {
    sass:{
        outputStyle: 'nested',
        includePaths: [
          '_FRAMEWORKS/bourbon5/core/',
          '_FRAMEWORKS/normalize-css/',
          '_FRAMEWORKS/susy/sass/',
          '_FRAMEWORKS/include-media/dist/',
          '_EXTENSIONS/fragments/fragments/src/',
        ]
    },
    sourcemaps:{
        path: ''
    },
    // Emailing - MJML
    mjml:{
      options: {
        keepComments: true,
        beautify: false,
        minify: false,
        validationLevel: 'soft',
        filePath: '.'
      }
    },
    nunjuks:{
        // templateExt: '.tpl',
    },
    bundleConfig: {
        dest: _BASE_PATH + _BUILD_DIR // Bundle destination
    },
    bundle: {
        'assets/css/main':{
            styles:[
                _SRC_PATH + _CSS_DIR + 'main.css'
            ],
            options: {
                minCss: prodLikeEnvs,
                uglify: false,
                rev: false,
                map:false,
                pluginOptions: { // pass additional options to underlying gulp plugins. By default the options object is empty
                    'gulp-clean-css': {
                        keepBreaks: true,
                        keepSpecialComments: 0
                    }
                }
            }
        },
        'assets/js/jquery': {
          scripts: [
            './_JS_LIBS/jquery/dist/jquery.js',
          ],
          options: {
            useMin: prodLikeEnvs,
            uglify: false,
            rev:false,
            maps:false
          }
        },
        'assets/js/plugins': {
            scripts: [
              //'./_JS_LIBS/jquery.ui.js',
              '_EXTENSIONS/fragments/fragments/src/addons/responsive_menu/responsive_menu.js',
              './_JS_LIBS/lightbox2/src/js/lightbox.js',
              // Add libs
            ],
            options: {
              useMin: prodLikeEnvs,
              uglify: true,
              rev:false,
              maps:false
            }
        },
        'assets/js/main': {
          scripts: [
            _SRC_PATH + _JS_DIR + 'main.js',
          ],
          options: {
            useMin: prodLikeEnvs,
            uglify: false,
            rev:false,
            maps:false
          }
        }
    },
    copy: [
        {
            src: [
                _SRC_PATH + 'assets/css/*.{map}',
                _SRC_PATH + '**.html',
                _SRC_PATH + 'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
            ],
            base: _SRC_PATH ,
            watch:true
        }
    ]
};

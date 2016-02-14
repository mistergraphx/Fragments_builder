/** # __APP_NAME__

*/
module.exports = {
    BasePath: '_KITCHEN/__APP_NAME__/',
    SrcPath: '_KITCHEN/__APP_NAME__/_src/',
    BuildPath: '_KITCHEN/__APP_NAME__/_BUILD/',
    DevPath: '_KITCHEN/__APP_NAME__/_BUILD/',
    JsPath: 'assets/js/',
    ImagePath: 'assets/images/',
    sassPath: '_scss/',
    sassOptions:{
        outputStyle: 'nested'
    },
    cssPath: 'assets/css/',
    templatesPath: '_src/templates/', // Swig Task
    breakpoints : [ // Déclinaison des images responsives
           { breakpoint: 'small', width: 480, crop: false },
           { breakpoint: 'medium', width: 800 },
           { breakpoint: 'large', width: 1200 }
    ],
    includePaths: [ // Sass include path
        '_FRAMEWORKS/bourbon/app/assets/stylesheets/',
        '_FRAMEWORKS/normalize-scss/',
        '_FRAMEWORKS/susy/sass/',
        '_FRAMEWORKS/include-media/dist/',
        '_EXTENSIONS/fragments/fragments_2.0/components/scss/',
    ],
    bundleConfig: {
        dest: '_KITCHEN/__APP_NAME__/_BUILD/' // Bundle destination
    },
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
                  // Add libs
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
                './_KITCHEN/__APP_NAME__/_src/**.html',
                './_KITCHEN/__APP_NAME__/_src/assets/fonts/**/*.{eot,svg,ttf,woff}'
            ],
            base: './_KITCHEN/__APP_NAME__/_src/',
            watch:true
        }
    ]
};
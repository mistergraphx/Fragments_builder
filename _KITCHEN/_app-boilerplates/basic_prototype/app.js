/** # __APP_NAME__

*/

var prodLikeEnvs = ['production', 'staging'];

module.exports = {
    BasePath: '_KITCHEN/__APP_NAME__/',
    SrcPath: '_KITCHEN/__APP_NAME__/_src/',
    BuildPath: '_KITCHEN/__APP_NAME__/_BUILD/',
    DevPath: '_KITCHEN/__APP_NAME__/_BUILD/',
    JsPath: 'assets/js/',
    cssPath: 'assets/css/',
    ImagePath: 'assets/images/',
    sassPath: '_scss/',
    sassOptions:{
        outputStyle: 'nested'
    },
    // Sass include path
    includePaths: [
        '_FRAMEWORKS/bourbon/app/assets/stylesheets/',
        '_FRAMEWORKS/normalize-scss/',
        '_FRAMEWORKS/susy/sass/',
        '_FRAMEWORKS/include-media/dist/',
        '_EXTENSIONS/fragments/fragments_2.0/components/scss/',
    ],
    sourcemaps:{
        path: ''
    },
    templatesPath: '_src/templates/', // Swig Task
    breakpoints : [ // Déclinaison des images responsives
           { breakpoint: 'small', width: 480, crop: false },
           { breakpoint: 'medium', width: 800 },
           { breakpoint: 'large', width: 1200 }
    ],
    // Emailing - MJML
    mjml:{
      options: {
        keepComments: true,
        beautify: false,
        minify: false,
        validationLevel: soft,
        filePath: '.'
      }
    },
    // Gallery generator
    gallery:{
        folder: 'gallery/', // a folder to inspect in project.image_path
        max_image_size: 800,
        format: 'jpeg',
        thumbnails:{
            width: 150,
            height:150
        }
    },
    bundleConfig: {
        dest: '_KITCHEN/__APP_NAME__/_BUILD/' // Bundle destination
    },
    bundle: {
        'assets/css/main.min':{
            styles:[
                './_KITCHEN/__APP_NAME__/_src/assets/css/main.css'
            ],
            options: {
                minCss: prodLikeEnvs,
                uglify: false,
                rev: false,
                map:false
            },
            pluginOptions: { // pass additional options to underlying gulp plugins. By default the options object is empty
                'gulp-clean-css': {
                    keepBreaks: true,
                    keepSpecialComments: 0
                },
           }
        },
        'assets/js/plugins': {
            scripts: [
                    //'./_JS_LIBS/jquery.ui.js',
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
            './_KITCHEN/__APP_NAME__/_src/assets/js/main.js',
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
                './_KITCHEN/__APP_NAME__/_src/**.html',
                './_KITCHEN/__APP_NAME__/_src/assets/fonts/**/*.{eot,svg,ttf,woff}'
            ],
            base: './_KITCHEN/__APP_NAME__/_src/',
            watch:true
        }
    ]
};

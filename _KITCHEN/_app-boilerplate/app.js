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
    bundleConfig: {
        dest: '_KITCHEN/__APP_NAME__/_BUILD/' // destination pour les bundles
    },
    breakpoints : [ // Déclinaison des images responsives
           { breakpoint: 'small', width: 480, crop: false },
           { breakpoint: 'medium', width: 800 },
           { breakpoint: 'large', width: 1200 }
    ],
    includePaths: [
        '_FRAMEWORKS/bourbon/app/assets/stylesheets/',
        '_FRAMEWORKS/normalize-scss/',
        '_FRAMEWORKS/susy/sass/',
        '_FRAMEWORKS/include-media/dist/',
        '_EXTENSIONS/fragments/fragments_2.0/components/scss/',
    ]
};
// __APP_PATH__
module.exports = {
    bundle: {
        'assets/css/styles':{
            styles:[
                './_KITCHEN/__APP_PATH__/_src/assets/css/main.css'
            ],
            options: {
                useMin: true,
                uglify: true,
                rev:false,
                maps:false
            }
        },
        'assets/js/plugins': {
            scripts: [
                  './_EXTENSIONS/fragments/js/components/navs/menumaker.js',
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
              './_KITCHEN/__APP_PATH__/_src/assets/js/main.js',
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
            src: './_KITCHEN/__APP_PATH__/_src/*.html',
            base: './_KITCHEN/__APP_PATH__/_src/',
            watch:{
                html:[
                    './_KITCHEN/__APP_PATH__/_src/**/*.html'
                ]
            }
        },
        {
            src: './_KITCHEN/__APP_PATH__/_src/images/**/*.*',
            base: './_KITCHEN/__APP_PATH__/_src/'
        }
    ]
};
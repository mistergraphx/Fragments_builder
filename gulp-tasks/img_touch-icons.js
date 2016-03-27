/** # touch-icons

Génère les icons pour mobile et favicons, depuis le fichier favicon.png
trouvé à la racide du dossier /src

Compatibilité des formats pour la favicon
https://en.wikipedia.org/wiki/Favicon#File_format_support

Css Tricks - Favicon Quiz
https://css-tricks.com/favicon-quiz/

@requires   gulp-image-resize
@see        https://www.npmjs.com/package/gulp-image-resize
@requires   gulp-imagemin
@requires   gulp-size
@see        https://github.com/sindresorhus/gulp-size

*/
module.exports = function(gulp, plugins, project, onError){
    
    var SrcPath = project.SrcPath;
    var ImagePath = project.ImagePath;
    
    return function(){
        
        var dest = project.BuildPath;
        var sizes = [{
                        size: 'favicon-default',
                        width: '16',
                        suffix: ''
                    },{
                        size: 'favicon-32',
                        width: '32',
                        suffix: '-32'
                    },{
                        size: 'favicon-96',
                        width: '96',
                        suffix: '-96'
                    },{
                        size: 'apple-touch-icon-57x57',
                        width: '57',
                        suffix: '-57'
                    },{
                        size: 'apple-touch-icon-72x72',
                        width: '72',
                        suffix: '-72'
                    },{
                        size: 'apple-touch-icon-60x60',
                        width: '60',
                        suffix: '-60'
                    },{
                        size: 'apple-touch-icon-76x76',
                        width: '76',
                        suffix: '-76'
                    },{
                        size: 'apple-touch-icon-114x114',
                        width: '114',
                        suffix: '-114'
                    },{
                        size: 'apple-touch-icon-120x120',
                        width: '120',
                        suffix: '-120'
                    },{
                        size: 'apple-touch-icon-144x144',
                        width: '144',
                        suffix: '-144'
                    },{
                        size: 'apple-touch-icon-152x152',
                        width: '152',
                        suffix: '-152'
                    }];
        
        sizes.forEach(function(s){
                
            // build the resize object
            var resize_settings = {
                width: s.width,
                crop: false,
                // never increase image dimensions
                upscale : false,
                //format: project.gallery.format
            }
            // only specify the height if it exists
            if (s.hasOwnProperty("height")) {
                resize_settings.height = s.height
            }
            // only specify format if it exists
            if (s.hasOwnProperty("format")) {
                resize_settings.format = s.format
            }
            
            gulp.src(SrcPath + 'favicon.png')
            // Only modify changed with gulp-changed
            .pipe(plugins.changed(dest))
            // resize them according to the width/height settings
            .pipe(plugins.imageResize(resize_settings))
            // optimize the images
            //.pipe(plugins.imagemin({
            //    progressive: true,
            //    // set this if you are using svg images
            //    // svgoPlugins: [{removeViewBox: false}],
            //    // use: [pngquant()]
            //}))
            .pipe(plugins.rename(function (path) { path.basename += s.suffix; }))
            .pipe(gulp.dest(dest));
        });
    }
};
/** # touch-icons

Génère les icons pour mobile et favicons, depuis le logo-site.png

@todo       - Les icon pour le touche sont au format carré : un logo pas forcément
            prévoir un logo-spécifique pour générer ces fichiers

@requires   gulp-image-resize
@see        
@requires   gulp-size
@see        https://github.com/sindresorhus/gulp-size

*/
module.exports = function(gulp, $, project, onError){
    
    var SrcPath = project.SrcPath;
    var ImagePath = project.ImagePath;
    
    return function(){
        return gulp.src(SrcPath+ImagePath+'/logo-site.png')
            .pipe($.plumber({
                errorHandler: onError
            }))
            .pipe($.imageResize({
              width : 196,
              height : 196,
              crop : false,
              upscale : false
            }))
            .pipe($.rename('chrome-touch-icon-196x196.png'))
            .pipe(gulp.dest(SrcPath+ImagePath+'/touch/'))
            .pipe($.size({title: 'images'}))
            .pipe($.notify('Image task Chrome icon is finished'))
            // Iphone touch icon
            .pipe($.imageResize({
              width : 128,
              height : 128,
              crop : false,
              upscale : false
            }))
            .pipe($.rename('icon-128x128.png'))
            .pipe(gulp.dest(SrcPath+ImagePath+'/touch/'))
            .pipe($.size({title: 'images'}))
            .pipe($.notify('Image task Iphone Touch icon is finished'))
            // MS touch icon
            .pipe($.imageResize({
              width : 144,
              height : 144,
              crop : false,
              upscale : false
            }))
            .pipe($.rename('ms-touch-icon-144x144-precomposed.png'))
            .pipe(gulp.dest(SrcPath+ImagePath+'/touch/'))
            .pipe($.size({title: 'images'}))
            .pipe($.notify('Image task MS Touch icon is finished'))
            // Fav icon
            .pipe($.imageResize({
              width : 16,
              height : 16,
              crop : false,
              upscale : false
            }))
            .pipe($.rename('favicon.png'))
            .pipe(gulp.dest(SrcPath+ImagePath+'/'))
            .pipe($.size({title: 'images'}))
            .pipe($.notify('Image task Favicon is finished'))
        ;
    }
};
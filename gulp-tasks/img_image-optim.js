/** # image-optim

Copy and optimize img  in the DEV directory



@requires   gulp-image-resize
@see        https://www.npmjs.com/package/gulp-image-resize
@requires   gulp-imagemin
@see        https://www.npmjs.com/package/gulp-imagemin
@requires   gulp-plumber
@requires   gulp-changed

*/
module.exports = function(gulp, $, project){
    var maxSize = 1200;
    var imgDest = project.DevPath+project.ImagePath;
    
    return function(){
        gulp.src(project.SrcPath + project.ImagePath + '**/*')
            .pipe($.plumber()) // evite que les taches s'arretes sur des erreurs et signale le node-module
            .pipe($.changed(imgDest)) // ne modifier que les images modiifées
            .pipe($.imagemin({
                optimizationLevel: 5, // Png
                progressive: true, // Jpeg
                interlaced: true, // Gif
                //use: [ pngcrush({ reduce: true }) ],
                svgoPlugins: [{removeViewBox: false}]
            }))
            .pipe($.imageResize({
              width : maxSize,
              height : maxSize,
              crop : false,
              upscale : false
            }))
        .pipe(gulp.dest(imgDest))
        .pipe($.size({title: 'images'}))
        .pipe($.notify('Image task is Finished'));
    }
};
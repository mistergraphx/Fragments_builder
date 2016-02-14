/** # Images Resize

Optimize Images + Resize

Copy and optimize img



*/

module.exports = function(gulp, plugins, project){
    return function(){
        gulp.src(project.SrcPath + project.ImagePath + '/**/*')
        .pipe(plugins.cache(plugins.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            //use: [ pngcrush({ reduce: true }) ],
            svgoPlugins: [{removeViewBox: false}]
        })))
        .pipe(imageResize({
          width : 1200,
          height : 1200,
          crop : false,
          upscale : false
        }))
        .pipe(gulp.dest(project.BuildPath+project.ImagePath))
        .pipe(plugins.size({title: 'images'}))
        .pipe(plugins.notify('Image task is Finished'));
    }
};
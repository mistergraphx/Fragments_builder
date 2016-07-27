/** # Images Resize

Optimize Images + Resize

Copy and optimize img, resize to project.breakpoints

This gist provide a code to loop over an array and run a pipe
<https://gist.github.com/ryantbrown/239dfdad465ce4932c81>

Ajouter à la configuration du projet des breakpoints :

~~~
responsive: {
    folder: ''
}
,
breakpoints : [
    { breakpoint: 'small', width: 50, crop: false },
    { breakpoint: 'medium', width: 800 },
    { breakpoint: 'large', width: 1200 }
],
~~~

@requires - gulp-image-resize
@see - https://www.npmjs.com/package/gulp-image-resize
@see - https://gist.github.com/ryantbrown/239dfdad465ce4932c81
@todo - tester si l'image file_name@bp.ext exist dans la src avant de la générer
@todo - gulp-changed pose problème lors du traitement il considère que les fichiers on déjà étés traités


*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError, marked){
    if (project.responsive) {
        return function(){
            
           
            
            var folder = project.responsive.folder;
                
           
            if (project.breakpoints) {
                var breakpoints = project.breakpoints;
            }else{
                var breakpoints = [
                    { breakpoint: 'small', width: 320, crop: false },
                    { breakpoint: 'medium', width: 800 },
                    { breakpoint: 'large', width: 1200 }
                ];
            }
            
             console.log(project.SrcPath + folder);
            
            breakpoints.forEach(function(bp){
                
                // build the resize object
                var resize_settings = {
                    width: bp.width,
                    crop: bp.crop,
                    // never increase image dimensions
                    upscale : false
                }
                // only specify the height if it exists
                if (bp.hasOwnProperty("height")) {
                    resize_settings.height = bp.height
                }
                
                var dest = project.BuildPath + folder;
                //grab images files
                gulp.src(project.SrcPath + folder + '**/*.{jpg,png,gif}')
                    // Only modify changed with gulp-changed
                    // the task done nothing when this pipe is used !!
                    //.pipe(plugins.changed(dest))
                    
                    // resize them according to the width/height settings
                    .pipe(plugins.imageResize(resize_settings))
                
                    // optimize the images
                    .pipe(plugins.imagemin({
                        progressive: true,
                        // set this if you are using svg images
                        // svgoPlugins: [{removeViewBox: false}],
                        // use: [pngquant()]
                    }))
                    // Rename
                    .pipe(plugins.rename({
                      suffix: '@'+bp.breakpoint
                    }))
                // output each image to the dest path
                // maintaining the folder structure
                //.pipe(gulp.dest(project.SrcPath+project.ImagePath))
                .pipe(gulp.dest(dest));
            });
                
        }

    }
};
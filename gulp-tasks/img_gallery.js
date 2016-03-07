/** # Thumb generator

genere des tailles d'images suivant `sizes` en les optimisant et en les redimensionnant width / height

```javascript
 var sizes = [{
    size: 'thumb',
    width: project.gallery.thumbnails.width,
    height: project.gallery.thumbnails.height,
    suffix: '-thumb'
},{
    size: 'big',
    width: project.gallery.max_image_size,
    suffix: '-opt'
}];

```

config:
app
    gallery
        folder
         max_image_size: 800
        thumbnails
         - width:150
         - height: 150
         
- Resize


*/

module.exports = function(gulp, plugins, project){
    return function(){
        var dest = project.BuildPath+project.ImagePath+project.gallery.folder;
        
        var sizes = [{
                    size: 'thumb',
                    width: project.gallery.thumbnails.width,
                    height: project.gallery.thumbnails.height,
                    suffix: '-thumb'
                },{
                    size: 'big',
                    width: project.gallery.max_image_size,
                    suffix: '-opt'
                }];
        
        sizes.forEach(function(s){
                
            // build the resize object
            var resize_settings = {
                width: s.width,
                crop: false,
                // never increase image dimensions
                upscale : false,
                format: project.gallery.format
            }
            // only specify the height if it exists
            if (s.hasOwnProperty("height")) {
                resize_settings.height = s.height
            }
            
            gulp.src(project.SrcPath + project.ImagePath + project.gallery.folder+'**/*.{jpg,jpeg,png,gif}')
            // Only modify changed with gulp-changed
            .pipe(plugins.changed(dest))
            // resize them according to the width/height settings
            .pipe(plugins.imageResize(resize_settings))
            // optimize the images
            .pipe(plugins.imagemin({
                progressive: true,
                // set this if you are using svg images
                // svgoPlugins: [{removeViewBox: false}],
                // use: [pngquant()]
            }))
            .pipe(plugins.rename(function (path) { path.basename += s.suffix; }))
            .pipe(gulp.dest(dest));
        });
    }
};
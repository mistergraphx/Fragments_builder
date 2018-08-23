/** # MJML

Options mjml Engine
https://github.com/mjmlio/mjml

option	           unit	       description	                    default value
fonts	             object	    Default fonts imported in the HTML rendered by HTML	See in index.js
keepComments	     boolean	  Option to keep comments in the HTML output	true
beautify	         boolean	  Option to beautify the HTML output	false
minify	           boolean	  Option to minify the HTML output	false
validationLevel	   string	    Available values for the validator: 'strict', 'soft', 'skip'	'soft'
filePath	         boolean	  Path of file, used for relative paths in mj-includes	'.'


*/

module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError, marked){
    var mjmlEngine = require('mjml');

    return function(){
        gulp.src(project.SrcPath+"/emails/*.mjml")
            .pipe(plugins.plumber({
                    errorHandler: onError
            }))
            .pipe(plugins.mjml(mjmlEngine,project.mjml.options))
            .pipe(gulp.dest(project.DevPath + 'newsletters/'))
            .pipe(plugins.notify({
                title: "MJML",
                message: "Mjml Project is rendered"
            }))
            .on("end", browserSync.reload);

        gulp.src(project.SrcPath + 'emails/images/**/*.{jpg,jpeg,png,gif,svg}')
            .pipe(plugins.plumber({
                    errorHandler: onError
            }))
            .pipe(gulp.dest(project.DevPath + 'newsletters/images/'))
            .pipe(plugins.notify({
                title: "MJML images",
                message: "Mjml images are updated in Build Folder"
            }));
    }
};

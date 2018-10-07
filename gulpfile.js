// 'use strict';

/** # Fragment Builder

v 2.0.0
*/

// ------------------------------------------------*/
// REQUIRE
// ------------------------------------------------*/

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var del     = require('del');
var lazypipe = require('lazypipe');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
// Get args from command line
var argv = require('minimist')(process.argv.slice(2));

var imageResize = require('gulp-image-resize');
//var pngcrush  = require('imagemin-pngcrush');



/** # Auto chargement des plugins


@requires       gulp-load-plugin
@see            https://www.npmjs.com/package/gulp-load-plugins
*/
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
        camelize: true,
        lazy:true
    });

var $ = plugins; //shortcut

/**



*/

var onError = function(err) {
    $.notify.onError({
        title:    "Gulp Task",
        subtitle: "ERROR !!",
        icon:     "./gulp-tasks/images/warning.png",
        message:  "Error: <%= error.message %>",
        sound:    "Basso",
        wait: true
    })(err);

    $.notify.on('click', function (options) {
       return false;
    });

    this.emit('end');
};

// Utils
var assignIn = require('lodash.assignin'),
    _ = require('lodash');

// -----------------------------------------------------------
// # Projects Configuration
// -----------------------------------------------------------
// Globals
// Base PROJECTS folder

_PROJECTS_PATH = "./_KITCHEN/";
_PROJECT = argv.project ;
_BASE_PATH = _PROJECTS_PATH + _PROJECT + '/' ;
_SRC_DIR = "_src/";
_SRC_PATH = _BASE_PATH + _SRC_DIR;
_BUILD_DIR = "_BUILD/";
_JS_DIR = "assets/js/";
_CSS_DIR = "assets/css/";
_IMG_DIR = "assets/images/";
_SASS_DIR = "assets/_scss/";
_PAGES_DIR = "pages/";
_DATAS_DIR = "datas/";
_TEMPLATES_DIR = "templates/";

/** # Project Loader

Chargement du fichier de config passé en argument de la commande.

`gulp task --project=project_name`

@requires       minimist
@see            https://www.npmjs.com/package/minimist
@see            https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-external-config-file.md
@see            http://istrategylabs.com/2015/02/swept-up-in-the-stream-5-ways-isl-used-gulp-to-improve-our-process/
*/

// Default configuration
var _config = require('./_config-default');
// Project Overides
var project = require(_BASE_PATH + '/app.js');

var config = _.merge({},_config, project);
// ------------------------------------------------*/
// # SETTINGS | SHORTCUTS
// ------------------------------------------------*/

// SRC
var SrcPath = config.SrcPath; // With a ending /
// Build
var BuildPath = config.BuildPath ;// With a ending /
var JsPath = config.JsPath ;
var ImagePath = config.ImagePath ;

gulp.task('config', function(){
  return console.log('Config : ' + JSON.stringify(config, null, 4));
});
gulp.task('test', function(){
  return console.log('Project : ' + argv.project );
});

// -----------------------------------------------------------
// # TASKS
// -----------------------------------------------------------


/* # Task Loader

[Utiliser un fichier de config externe avec Gulp](https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-external-config-file.md)



@function
@name getTask
@param {task}
@see http://macr.ae/article/splitting-gulpfile-multiple-files.html

@see https://www.npmjs.com/package/gulp-task-loader
*/
function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, config, browserSync, onError);
}
// Styles
// Pre-pross/ Post : autoprefixing, …
gulp.task('styles', getTask('styles'));


gulp.task('build-sprite', getTask('svgSprite'));

// ASSETS MANAGMENT
gulp.task('bundle-assets', getTask('bundle-assets'));

// TEMPLATING
gulp.task('prototype', getTask('prototype'));




// IMAGES TOOLS
gulp.task('image-touch-icons', getTask('img_touch-icons')); // Generate touch icons
gulp.task('image-optim', getTask('img_image-optim')); // Optimize
gulp.task('image-resize', getTask('img_image-resize')); // Resize image to a max Size
gulp.task('image-responsives', getTask('img_responsives')); // Generate images variations for different brealpoints
gulp.task('image-galleries', getTask('img_galleries')); // Generate thumbs




// Utils

gulp.task('html2build', function() {
    gulp.src(SrcPath+'**/*.html')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe($.cached('html'))
        .pipe(gulp.dest(config.BuildPath))
        .pipe(browserSync.stream())
        .pipe($.notify({
            title: "Html Updated",
            message: "Html files are updated in Build Folder"
        }));
});

gulp.task('images2build', function() {
    gulp.src(SrcPath + config.ImagePath + '**/*.{jpg,jpeg,png,gif}')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe($.cached('images'))
        .pipe(gulp.dest(config.BuildPath + config.ImagePath))
        .pipe(browserSync.stream())
        .pipe($.notify({
            title: "Images folder Updated",
            message: "All images files are updated in Build Folder"
        }));
});


gulp.task('assets2build', function() {
    gulp.src(SrcPath+'**/*.{css,js}')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe($.cached('assets'))
        .pipe(gulp.dest(config.BuildPath))
        .pipe(browserSync.stream())
        .pipe($.notify({
            title: "Assets Updated",
            message: "Assets files are updated in Build Folder"
        }));
});



// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.BuildPath
        }
    });
});

// ---------------------------------------------------------------------------
// # COMMANDS
// ---------------------------------------------------------------------------


/** # Build static site
 *
 * Génère un site static
 *
 *
 */
gulp.task('static-site', ['styles', 'prototype', 'bundle-assets'], function () {
    browserSync.init({
        server: config.BuildPath
    });
    // console.log('SCSS PASS' + config.sassPath);
    gulp.watch(config.sassPath+"/**/*.scss", ['styles']);
    gulp.watch(config.SrcPath+"templates/*.njk", ['prototype','bundle-assets']);
    gulp.watch(config.SrcPath+"pages/**/*.md", ['prototype','bundle-assets']);
    gulp.watch(config.SrcPath+"datas/**/*.json", ['prototype']);
    //gulp.watch(config.SrcPath+config.ImagePath+"**/*.{jpg,jpeg,png,gif}", ['images2build']);
    // gulp.watch(config.SrcPath+config.galleries.folder+"**/*.{jpg,jpeg,png,gif}", ['image-galleries']);
    //gulp.watch(config.SrcPath+"**/*.html", ['html2build']);
    gulp.watch(config.SrcPath+"**/*.{css,js}", ['bundle-assets']);
});

// ## Sass-watch
gulp.task('sass-watch', ['styles'], function () {
    gulp.watch(config.sassPath+"/**/*.scss", ['styles']);
});

// ## Default Task
gulp.task('default', ['styles','bundle-assets'], function () {
    gulp.watch(config.sassPath+'**/*.scss', ['styles']);
    gulp.watch(config.SrcPath+config.ImagePath+"**/*.{jpg,jpeg,png,gif,svg}", ['bundle-assets']);
    gulp.watch(config.SrcPath+"assets/**/*.{css,js}", ['bundle-assets']);
});

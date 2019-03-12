"use strict";
// # Fragment Builder
//
// v2.0.2

// ------------------------------------------------*/
// REQUIRE
// ------------------------------------------------*/
var gulp    = require('gulp');
//var gutil   = require('gulp-util'); // @deprecated

var del     = require('del'); // @unused
var lazypipe = require('lazypipe'); // @unused

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var sourcemaps = require('gulp-sourcemaps');

// Get args from command line
var argv = require('minimist')(process.argv.slice(2));

var imageResize = require('gulp-image-resize');
//var pngcrush  = require('imagemin-pngcrush');

// Auto chargement des plugins
// @deprecated
// @todo           revenir au require et savoir ce que l'on charge quand on le charge
// @requires       gulp-load-plugin
// @see            https://www.npmjs.com/package/gulp-load-plugins
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
        camelize: true,
        lazy:true
    });

var $ = plugins; //shortcut

// Error handling, notifications
// https://www.npmjs.com/package/gulp-notify
// https://github.com/mikaelbr/node-notifier
// https://github.com/gulpjs/fancy-log
// https://github.com/chalk/chalk
var onError = function(err) {

    $.notify.onError({
        title:    "<%= error.plugin %>" ,
        subtitle: "ERROR !!",
        icon:     "./gulp-tasks/images/warning.png",
        message:  "<%= error.message %>",
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
global._PROJECTS_PATH = "./_KITCHEN/";
global._PROJECT = argv.project ;
global._BASE_PATH = _PROJECTS_PATH + _PROJECT + '/' ;
global._SRC_DIR = "_src/";
global._SRC_PATH = _BASE_PATH + _SRC_DIR;
global._BUILD_DIR = "_BUILD/";
global._BUILD_PATH = _BASE_PATH + _BUILD_DIR;
global._JS_DIR = "assets/js/";
global._CSS_DIR = "assets/css/";
global._IMG_DIR = "assets/images/";
global._SASS_DIR = "assets/_scss/";
global._PAGES_DIR = "pages/";
global._DATAS_DIR = "datas/";
global._TEMPLATES_DIR = "templates/";

// # Project Loader
//
// Chargement du fichier de config passé en argument de la commande.
//
// `gulp task --project=project_name`
//
// @requires       minimist
// @see            https://www.npmjs.com/package/minimist
// @see            https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-external-config-file.md
// @see            http://istrategylabs.com/2015/02/swept-up-in-the-stream-5-ways-isl-used-gulp-to-improve-our-process/

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

// Linting
// https://github.com/anandthakker/doiuse
var postcss = require('gulp-postcss');
var doiuse = require('doiuse');
// Remove mapSource from stream
// ?? ne fait rien, le lien vers la source map n'est pa effacé du stream
var purgeSourcemaps = require('gulp-purge-sourcemaps');

gulp.task('style-lint',function(){
  var report = [];
  gulp.src(_SRC_PATH + 'assets/css/*.css', { cwd: process.cwd() })
      .pipe(purgeSourcemaps())
      // PostCSS
      .pipe(postcss([
        require("doiuse")({
          browsers:['ie >= 11'],
          ignore: ['rem','flexbox'], // an optional array of features to ignore
          ignoreFiles: ['/main.css.map'], // an optional array of file globs to match against original source file path, to ignore
          onFeatureUsage: function(usageInfo) {
              report.push(usageInfo.message+'\n');
          }
        })
      ]))
      .pipe(gulp.dest(config.BuildPath).on('end', function(){
          console.log(report);
          const fs = require('fs');
          fs.writeFile(_SRC_PATH+ _PROJECT+'-style-lint.txt', report, function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          });
      }));

});

// doiuse

// Svg Tool
gulp.task('build-sprite', getTask('svgSprite'));

gulp.task('font-blast', function(){
    var explodeFont = require('./gulp-tasks/fontblast')(config.fontblast);
    return explodeFont();
});

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
gulp.task('font2build', function() {
    gulp.src(_SRC_PATH + 'assets/fonts/**/*.{woff,woff2}')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe($.cached('fonts'))
        .pipe(gulp.dest(config.BuildPath))
        .pipe(browserSync.stream())
        .pipe($.notify({
            title: "Font files Updated",
            message: "Fon files are updated in Build Folder"
        }));
});

gulp.task('images2build', function() {
    gulp.src(config.SrcPath + config.ImagePath + '**/*.{jpg,jpeg,png,gif,svg}')
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
    gulp.src(config.SrcPath + '**/*.{css,js}')
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



// browser-sync starting the server.
// https://www.browsersync.io/docs/options
/*
browserSync.init({
    open: 'external',
    host: 'myproject.local',
    proxy: 'myproject.local', // or project.dev/app/
    port: 3000
});
*/
gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: _BUILD_PATH
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
gulp.task('static-site', ['styles', 'prototype', 'bundle-assets','browser-sync'], function () {
    gulp.watch(config.sassPath+"**/*.scss", ['styles']);
    gulp.watch(config.SrcPath+"templates/*.njk", ['prototype']);
    gulp.watch(config.SrcPath+"pages/**/*.md", ['prototype']);
    gulp.watch(config.SrcPath+"datas/**/*.json", ['prototype']);
    gulp.watch(config.SrcPath+config.ImagePath+"**/*.{jpg,jpeg,png,gif}", ['images2build']);
    // gulp.watch(config.SrcPath+config.galleries.folder+"**/*.{jpg,jpeg,png,gif}", ['image-galleries']);
    gulp.watch(config.BuildPath + "**/*.html").on('change', browserSync.reload);
    gulp.watch(config.SrcPath+"assets/**/*.{css,js}", ['bundle-assets']);
});

// ## Sass-watch
gulp.task('sass-watch', ['styles'], function () {
    gulp.watch(config.sassPath+"**/*.scss", ['styles']);
});

// ## Default Task
gulp.task('default', ['styles','bundle-assets'], function () {
    gulp.watch(config.sassPath + '**/*.scss', ['styles']);
    gulp.watch(config.SrcPath + config.ImagePath + "**/*.{jpg,jpeg,png,gif,svg}", ['images2build']);
    gulp.watch(config.SrcPath + "assets/**/*.{css,js}", ['bundle-assets']);
});

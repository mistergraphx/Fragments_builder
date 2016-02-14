'use strict';

/** # Gulp


## Node.js

### Désinstaller Node
http://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x

La solution qui marche avec brew :
https://gist.github.com/DanHerbert/9520689

### Mettre a jour Node.js :

    brew upgrade node


## Npm :

Update:
run `npm update` in the same directory as your package.json file.
<https://docs.npmjs.com/getting-started/updating-local-packages>



[Gulp - CLI ](https://github.com/gulpjs/gulp/blob/master/docs/CLI.md)
[Gulp Recipies ](https://github.com/gulpjs/gulp/tree/master/docs/recipes)


[Spliting gulp file](http://macr.ae/article/splitting-gulpfile-multiple-files.html)

Stories and examples :

5 way isl used gulp to improve ou process :
http://istrategylabs.com/2015/02/swept-up-in-the-stream-5-ways-isl-used-gulp-to-improve-our-process/

Understanding module export:
<http://www.sitepoint.com/understanding-module-exports-exports-node-js/>

Build a better GulpFile
<http://drewbarontini.com/articles/building-a-better-gulpfile/>

Glob.nodes: 
<https://github.com/isaacs/node-glob>

Improve gulp building system:
Task depndencies and task as plugins
<https://github.com/lordofthelake/gag>

Testing tools :
---------------

Gulpt : cli wrapper pour Gulp utilisant time-require
pour afficher des statistiques de chargement des modules

<https://github.com/jaguard/gulpt>

Gulp usage
-----------

Debug avec gulp-util - `$.util.log('Message');`

Modules docs :
--------------

Gulp-rename
<https://www.npmjs.org/package/gulp-rename/>


Gulp Plumber :
<https://www.npmjs.org/package/gulp-plumber>

Gulp-Notify :
https://www.npmjs.org/package/gulp-notify
    .pipe($.notify('message'))

gulp-filter
https://www.npmjs.org/package/gulp-filter

gulp-autoprefixer
<https://www.npmjs.org/package/autoprefixer>

gulp-sass
<https://www.npmjs.org/package/gulp-sass>

gulp-minify-css
<https://www.npmjs.org/package/gulp-minify-css>
Deprecated : use gulp-cssnano


CSSo
Pakage : <https://www.npmjs.org/package/csso>
<http://bem.info/tools/optimizers/csso//>

Gulp-size
<https://github.com/sindresorhus/gulp-size>

---

Gulp Swig               - Swig templates
swig-marked             - Markdown filter and tag for Swig

Static web pages generation:
<http://blog.crushingpennies.com/a-static-site-generator-with-gulp-proseio-and-travis-ci.html>

---

Browser-sync
<http://www.browsersync.io/docs/gulp/>

Minimist : Comand line tool
<https://www.npmjs.com/package/minimist>

---

Sass / Node Sass

Importer : import_once
Add to node-sass the ruby sass import_once function
<https://www.npmjs.com/package/node-sass-import-once>
Ne fonctionne pas avec gulp-sass 

---

Icons Fonts

Actuellement on utilise gulp-fontello : `./gulp-tasks/fontello.js`

Gestion des icones

CssTricks : Icon fonts vs SVG
<https://css-tricks.com/icon-fonts-vs-svg/>

Construire un set d'icone sur mesure et optimisé pour un projet

## Project generator

Slush:
http://joakim.beng.se/blog/posts/slush-replacing-yeoman-with-gulp.html
Gulp-template:
https://github.com/sindresorhus/gulp-template

## Build Tools :


comment utiliser npm comme un outil de build :
<http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/>

Arretons d'utiliser Gulp/Grunt :
<http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/>


Grunt SvgStore : <https://github.com/FWeinb/grunt-svgstore>
Gulp SvgStore : <https://github.com/w0rm/gulp-svgstore>

Générer une icon font :
<https://www.npmjs.com/package/gulp-iconfont>

Gulp-icon permet d'automatiser, la génération des icones d'un site au format svg,png base64 et png fichiers
<https://github.com/filamentgroup/gulpicon>
<https://www.npmjs.com/package/gulpicon>


---




TODO :
------

@todo https://www.npmjs.org/package/gulp-iconfont
@todo scsslint : https://www.npmjs.com/package/gulp-scss-lint
@todo scssLint : https://github.com/sasstools/sass-lint
@todo stylestats : Générer des statistiques sur les css générées : https://www.npmjs.com/package/stylestats Gulp Module : https://github.com/1000ch/gulp-stylestats
                        
@todo SassPort : Share asset and Javascript in sass : https://github.com/davidkpiano/sassport/

@ todo Json/Sass : https://www.npmjs.com/package/json-sass

@todo - Optimisation des css - <https://www.npmjs.com/package/cssshrink>
<https://www.npmjs.com/package/gulp-cssshrink>

*/
// ------------------------------------------------*/
// REQUIRE
// ------------------------------------------------*/

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var del     = require('del');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
// Get args from command line
var argv = require('minimist')(process.argv.slice(2));

var imageResize = require('gulp-image-resize');
//var pngcrush  = require('imagemin-pngcrush');
var marked = require('swig-marked');

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



// -----------------------------------------------------------
// # Projects Configuration
// -----------------------------------------------------------



/** # Project Loader

Chargement du fichier de config passé en argument de la commande.
    
`gulp task --project=project_name`

@requires       minimist
@see            https://www.npmjs.com/package/minimist
@see            https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-external-config-file.md
@see            http://istrategylabs.com/2015/02/swept-up-in-the-stream-5-ways-isl-used-gulp-to-improve-our-process/
*/

var project = require('./gulp-configs/' + argv.project);


// ------------------------------------------------*/
// # SETTINGS | SHORTCUTS
// ------------------------------------------------*/

// SRC
var SrcPath = project.SrcPath; // With a ending /
// Build
var BuildPath = project.BuildPath ;// With a ending /
var JsPath = project.JsPath ;
var ImagePath = project.ImagePath ;


// -----------------------------------------------------------
// # TASKS
// -----------------------------------------------------------


/** # Task Loader

[Utiliser un fichier de config externe avec Gulp](https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-external-config-file.md)



@function
@name getTask
@param {task} 
@see http://macr.ae/article/splitting-gulpfile-multiple-files.html

@see https://www.npmjs.com/package/gulp-task-loader
*/
function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, project, sourcemaps, browserSync, onError, marked);
}

// ASSETS MANAGMENT
gulp.task('bundle-assets', getTask('bundle-assets'));

// Update/install icon fonts
gulp.task('fontello', getTask('fontello'));

// PREPROCSS
gulp.task('lib-sass', getTask('lib-sass'));

// CSS TOOLS
gulp.task('autoprefixer', getTask('autoprefixer'));
gulp.task('combineMQ', getTask('combineMQ'));

// IMAGES TOOLS
gulp.task('touch-icons', getTask('img_touch-icons')); // Generate touch icons 
gulp.task('image-optim', getTask('img_image-optim')); // Optimize
gulp.task('image-resize', getTask('img_image-resize')); // Resize image to a max Size
gulp.task('image-responsives', getTask('img_responsives')); // Generate images variations for different brealpoints

// TEMPLATING
gulp.task('swig', getTask('swig'));



// -----------------------------------------------------------
// ## DEBUG - TEST 
// -----------------------------------------------------------



/** # Lint JavaScript

Test the validity of javascript files

*/
gulp.task('jshint', function () {
  return gulp.src(SrcPath + JsPath + '/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(reload({stream: true, once: true}))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});



// -----------------------------------------------------------
// ## PREPROSS  & CSS 
// -----------------------------------------------------------



/** # minify-css

@todo       - A faire dans bundle-assets
*/
gulp.task('minify-css', function() {
  gulp.src(project.SrcPath + project.cssPath + '/*.css')
    .pipe($.plumber({
            errorHandler: onError
    }))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss({
        keepBreaks:false,
        keepSpecialComments: false // * for keeping all (default), 1 for keeping first one only, 0 for removing all
    }))
    .pipe(gulp.dest(project.DevPath + 'css/'))
});




// -----------------------------------------------------------
// ## IMAGES
// ./gulp-tasks/img_image-optim.js
// ./gulp-tasks/img_image-resize.js
// -----------------------------------------------------------




// -----------------------------------------------------------
// ## FONT FACES
// -----------------------------------------------------------

/** fonts

simply copy the font folder to the buid dest


*/
gulp.task('fonts', function () {
    gulp.src(SrcPath + '/assets/fonts/**/font/*')
        .pipe(gulp.dest(project.DevPath + '/fonts/'))
        .pipe($.notify({ message: "Fonts Task Is Done"}) );
});

// -----------------------------------------------------------
// ## JS
// -----------------------------------------------------------

 /** BuildJs
*/
gulp.task('buildJs', function () {
        gulp.src(SrcPath +'/assets/js/*.js')
            .pipe(gulp.dest(project.DevPath+'/js/'))
            .pipe($.notify({
                message: "Javascripts files are in dev"
        }) );
});



/** # Jquery-minify

combine and minify the fallback version of jquery

@state - test
*/
gulp.task('Jquery-minify', function(){
    gulp.src(SrcPath + JsPath + '/vendors/jquery/jquery.js')
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest(BuildPath + JsPath))
        .pipe($.notify({ message: "Jquery is now ugly!"}) );
});

// gulp-minify-html@1.0.5: Consider using gulp-htmlmin
gulp.task('Html-minify', function(){
    var opts = {comments:false,spare:true};

    gulp.src([ SrcPath +'_site/**/*.html', '!'+SrcPath+'_site/assets/**'])
        .pipe($.minifyHtml(opts))
        .pipe(gulp.dest(BuildPath))
        .pipe($.notify({
            title: "HTML TASK",
            message: "Html is Minified !"
        }) );
});


// ------------------------------------------------*/
// ## HTML & TEMPLATING TASKS
// ------------------------------------------------*/

/** gulp-mustache

@state - partials don't work
*/
gulp.task('mustache', function() {
    gulp.src(SrcPath+"/templates/*.mustache")
    .pipe($.mustache({
        msg: "Hello Gulp!",
        nested_value: "I am nested.",
        another_value: "1 2 3"
    },{},{
        head: SrcPath+"/templates/partials/head.mustache"
    }))
    .pipe($.rename({extname: '.html'}))
    .pipe(gulp.dest(SrcPath))
    .pipe($.notify({
            title: "Mustache TASK",
            message: "Html is rendered"
        }) );
});

/** gulp-liquify

- 

https://www.npmjs.org/package/gulp-liquify
https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
https://www.npmjs.org/package/gulp-liquify

*/
gulp.task('liquify', function() {
    
    var locals = require('./'+SrcPath+'app.json');
    
    gulp.src(SrcPath+"/templates/*.liquid")
        .pipe($.liquify(locals,{base:SrcPath+'templates/partials/'}))
        .pipe($.rename({extname: '.html'}))
        .pipe(gulp.dest(SrcPath))
        .pipe($.notify({
            title: "LIQUID TASK",
            message: "Html is rendered"
        }) );
});




/** # gulp-usemin

<https://www.npmjs.org/package/gulp-usemin>

Ne gère pas les url absolues on se retrouve
donc a dupliquer asset dans tous les dossiers des pages

@state - test

*/
gulp.task('usemin', function() {
    gulp.src([ SrcPath +'*.html', '!'+SrcPath+'assets/**'])
        .pipe($.usemin({
            //css: [$.minifyCss(), 'concat'],
            AppJs: [$.uglify()],
        }))
        .pipe(gulp.dest(BuildPath));
    
});

// ------------------------------------------------*/
// ## FILE SYSTEM
// ------------------------------------------------*/

/** Copy CSS to Build Path

*/
gulp.task('buildCss', function(){
    gulp.src(SrcPath+"/assets/css/*.css")
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe(gulp.dest(BuildPath+"assets/css/"))
        .pipe($.notify({
            title: "CSS have moved to Build Path",
            message: "with success !"
        }));

});


/** # Clean

Clean  Output Directory

https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md

*/
//gulp.task('clean', del.bind(null, BuildPath));

gulp.task('clean', function(cb) {
    del([BuildPath+'assets/css', BuildPath+'assets/js'], cb)
});

gulp.task('clean-html', function(cb) {
    del(BuildPath+'/*.html', cb)
});

/** # Watch


*/
// Rerun the task when a file changes
// @outdated
gulp.task('watch', function() {
  gulp.watch(project.SrcPath+project.sassPath+'/*.scss', ['lib-sass']);
});



// ### Copy2dev
gulp.task('copy-2-dev', function() {
    gulp.src(BuildPath+'assets/**/*.*')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe(gulp.dest(project.DevPath))
        .pipe($.notify({
            title: "Copy 2 Dev",
            message: "Build is ready to test"
        }));
});



gulp.task('html2build', function() {
    gulp.src(SrcPath+'**/*.html')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe($.cached('html2build'))
        .pipe(gulp.dest(project.BuildPath))
        .pipe(browserSync.stream())
        .pipe($.notify({
            title: "Html Updated",
            message: "Html files are updated in Build Folder"
        }));
});

gulp.task('images2build', function() {
    gulp.src(SrcPath + project.ImagePath + '**/*.{jpg,jpeg,png,gif}')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe($.cached('images2build'))
        .pipe(gulp.dest(project.BuildPath + project.ImagePath))
        .pipe(browserSync.stream())
        .pipe($.notify({
            title: "Images forlder Updated",
            message: "All images files are updated in Build Folder"
        }));
});


gulp.task('assets2build', function() {
    gulp.src(SrcPath+'**/*.{css,js}')
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe($.cached('assets2build'))
        .pipe(gulp.dest(project.BuildPath))
        .pipe(browserSync.stream())
        .pipe($.notify({
            title: "Assets Updated",
            message: "Assets files are updated in Build Folder"
        }));
});

// ### build
gulp.task("build", function(callback){
    runSequence(
        // Clean css and js folders
        'clean',
        // Autoprefix
        'autoprefixer',
        'combineMQ',
        // copy css to the buid dest
        'buildCss',
        // Copy fonts files
        'fonts',
        // copy and optimize images
        'images',
        // Generate a fallback version of the jquery lib
        'Jquery-minify',
        // copy and minify js vendors with gulp usemin
        'buildJs',
        // Clean html files copied by Usemin
        'copy-2-dev',
        callback);
});

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: project.SrcPath
        }
    });
});

// ---------------------------------------------------------------------------
// # COMMANDS
// ---------------------------------------------------------------------------

// ## Jekyl
gulp.task('Jekyll', function(callback) {
    runSequence('clean',
              'images',
              'Jquery-minify',
              'usemin',
              'Html-minify',
              'fonts',
              callback);
});

gulp.task('optimize_vendors', function() {
    
    var vPath = [SrcPath+'vendor/**/*.{php,json,yaml}',
        '!'+SrcPath+'vendor/**/test/*.*',
        '!'+SrcPath+'vendor/**/*.{svn,git}'
    ];
    
    return gulp.src(vPath)
        .pipe($.plumber({
                errorHandler: onError
        }))
        .pipe(gulp.dest(project.BuildPath))
        .pipe($.notify({
            title: "Composer Vendor",
            message: "Optimized"
        }));
});

/** # Prototype
 *
 * 
 */ 
gulp.task('prototype', ['lib-sass', 'swig', 'bundle-assets','images2build'], function () {
    
    browserSync.init({
        server: project.BuildPath
    });
    
    gulp.watch(project.SrcPath+project.sassPath+"/**/*.scss", ['lib-sass', 'autoprefixer', 'combineMQ','assets2build']);
    gulp.watch(project.SrcPath+"templates/*.twig", ['swig']);
    gulp.watch(project.SrcPath+"datas/**/*.json", ['swig']);
    gulp.watch(project.SrcPath+project.ImagePath+"**/*.{jpg,jpeg,png,gif}", ['images2build']);
    gulp.watch(project.SrcPath+"**/*.html", ['html2build']);
    gulp.watch(project.SrcPath+"**/*.{css,js}", ['assets2build']);
});

// ## Sass-watch
gulp.task('sass-watch', ['lib-sass','autoprefixer', 'combineMQ'], function () {
    gulp.watch(project.SrcPath+project.sassPath+"/**/*.scss", ['lib-sass', 'autoprefixer', 'combineMQ']);
});


gulp.task('prefix', ['autoprefixer'], function () {
    gulp.watch(project.SrcPath+project.cssPath+"/**/*.css", ['autoprefixer']);
});

// ## Default Task
gulp.task('default', ['lib-sass','bundle-assets'], function () {
        //gulp.watch(project.SrcPath+project.cssPath+'**/*.css', ['autoprefixer']);
    gulp.watch(project.SrcPath+project.sassPath+'**/*.scss', ['lib-sass', 'autoprefixer']);
    //gulp.watch(project.SrcPath+'assets/fonts/**/fonts/*', ['fonts']);
    gulp.watch(project.SrcPath+'**/*.html', ['bundle-assets']);
    gulp.watch(project.SrcPath+project.cssPath+'*.css', ['bundle-assets']);
    gulp.watch(project.SrcPath+project.JsPath+'*.js', ['bundle-assets']);
});


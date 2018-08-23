'use strict';

/** # Fragment Builder


## Node.js

### Désinstaller Node
http://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x

La solution qui marche avec brew :
https://gist.github.com/DanHerbert/9520689

### Mettre a jour Node.js :

        brew update
        brew upgrade node
        npm install|update -g npm


## Npm :

Update:
run `npm update` in the same directory as your package.json file.
<https://docs.npmjs.com/getting-started/updating-local-packages>



[Gulp - CLI ](https://github.com/gulpjs/gulp/blob/master/docs/CLI.md)
[Gulp Recipies ](https://github.com/gulpjs/gulp/tree/master/docs/recipes)


[Spliting gulp file](http://macr.ae/article/splitting-gulpfile-multiple-files.html)

Stories and examples :
----------------------

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

Task dependencie / task in series
https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

Advanced gulp file
https://www.mikestreety.co.uk/blog/advanced-gulp-file

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

Rquire sass permet de faire un require sur un fichier sass
et de le compiler via node en y injectant des variables
https://www.npmjs.com/package/require-sass

---

Icons Fonts

Actuellement on utilise gulp-fontello : `./gulp-tasks/fontello.js`

Gestion des icones

CssTricks : Icon fonts vs SVG
<https://css-tricks.com/icon-fonts-vs-svg/>

Construire un set d'icone sur mesure et optimisé pour un projet

Svg sprites
https://github.com/jkphl/gulp-svg-sprite

permet la création automatisé de sprites svg,
gestion de fallback png,
utilisation inline de svg via symbol, def
ou via la technique css
https://www.npmjs.com/package/gulp-svg-sprites



Grunt SvgStore : <https://github.com/FWeinb/grunt-svgstore>
Gulp SvgStore : <https://github.com/w0rm/gulp-svgstore>

Générer une icon font :
<https://www.npmjs.com/package/gulp-iconfont>

Gulp-icon permet d'automatiser, la génération des icones d'un site au format svg,png base64 et png fichiers
<https://github.com/filamentgroup/gulpicon>
<https://www.npmjs.com/package/gulpicon>


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


Command lines /exec :
http://stackoverflow.com/questions/29511491/running-a-shell-command-from-gulp
https://www.npmjs.com/package/gulp-exec

---




TODO :
------

@todo  Emailing/newsletter task
        Comme chez Zurb et fundation 4 email
        https://github.com/zurb/panini
        Proposer des taches de conception de emailing
        - inliner de css
        - optimisation compression des images

        Un inliner css :
                https://github.com/Automattic/juice
                https://www.npmjs.com/package/gulp-inline
        Une syntaxe simplifiée pour la génération de tableaux html
                https://github.com/zurb/inky
        Node module utilisant Swig template : https://github.com/andrewrk/swig-email-templates

@todo   Utilisation de post-css plugins pour gérer le rythm vertical
        https://www.npmjs.com/package/postcss-lh

        article et explication de la necessitée d'utilisation d'un ryhtm vertical en typographie
        https://zellwk.com/blog/why-vertical-rhythms/

@todo   Réécriture des taches de templating en utilisant nunjuks plutot que swig
        utiliser https://www.npmjs.com/package/markdown-it
        pour le contenu markdown à la place de marked

@todo   [En Cours]  Gestion des icones fonts
        https://www.npmjs.org/package/gulp-iconfont
        http://www.carsonshold.com/2015/11/svg-icon-workflow-with-gulp-and-shopify/

        Changer les icon-fonts pour les sprites svg :
        Tuto sur les méthodes d'intégration :
                - https://sarasoueidan.com/blog/icon-fonts-to-svg/
                - https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/
        Tour d'horizon des +/- : https://css-tricks.com/icon-fonts-vs-svg/
        Intégration des svg sprites : https://css-tricks.com/svg-sprites-use-better-icon-fonts/

        Extraire d'une font les icons en svg, png
        https://www.npmjs.com/package/font-blast


@todo   scsslint : https://www.npmjs.com/package/gulp-scss-lint
@todo   scssLint : https://github.com/sasstools/sass-lint
        Stats : errors , pages speed, dev tool
        http://devbridge.github.io/Performance/

        Immutables css : outil qui reporte les css surchargées, utilisable avec  postcss
        https://github.com/johnotander/immutable-css

@todo   Command line utilities
        https://www.npmjs.com/package/commander

@todo   stylestats : Générer des statistiques sur les css générées :
        Installle énormément de modules, plutot utiliser un outil en ligne
        https://www.npmjs.com/package/stylestats Gulp Module : https://github.com/1000ch/gulp-stylestats

@todo   SassPort :
        Share asset and Javascript in sass : https://github.com/davidkpiano/sassport/

@todo   Json/Sass :
        https://www.npmjs.com/package/json-sass

@todo   [test] - SwigTask - Minify Html

        gulp-htmlmin
        https://www.npmjs.com/package/gulp-htmlmin

@todo - Optimisation des css -
        https://www.npmjs.com/package/gulp-pixrem - rem fix
        <https://www.npmjs.com/package/cssshrink>
        <https://www.npmjs.com/package/gulp-cssshrink>
        <https://www.npmjs.com/package/gulp-csscss/>

@todo - Passer a Gulp 4 - Ordre d'enchainement des taches
        !! A voir au plus vite !!
        https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

        gulpif permet de n'executer la tache que quand la pipe précédente a été exécuté
        fonctionne avec lazyPipe
        https://github.com/robrich/gulp-if

@todo - Task Build :
        - améliorer la gestion de la copie vers BUILD pour les images :
                - cas des images du design
                - et images types gallerie

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

var project = require('./_KITCHEN/' + argv.project + '/app.js');


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


/* # Task Loader

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

// var module = require('./gulp-tasks/test');
// console.log(module.test());


function libsass(){
    return gulp.src(project.SrcPath + project.sassPath+'**/*.scss')
          // Error Handler
          .pipe($.plumber({
              errorHandler: onError
          }))
          // Sourcemaps initialisation
          .pipe(sourcemaps.init())
          // Sass
          .pipe($.sass({
              errLogToConsole: true,
              outputStyle: project.sassOptions.outputStyle, // compressed | nested
              //sourceComments:'none',
              //sourceMap:'sass',
              includePaths : project.includePaths
          }))
          .pipe(sourcemaps.write('./', {
            //includeContent: false,
            sourceRoot: '../_scss',
            destPath: project.bundleConfig.dest ,
            //sourceMappingURLprefix: project.bundleConfig.dest + 'assets/css'
          }))
          .pipe(gulp.dest(project.SrcPath+project.cssPath))
          .pipe(browserSync.stream())
          .pipe(plugins.notify('Sass Files Compiled'));
}


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7.1',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

function autoprefixer(){
  return gulp.src(project.SrcPath+project.cssPath+'**/*.css')
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            .pipe(plugins.autoprefixer({
                browsers: AUTOPREFIXER_BROWSERS,
                cascade: false
            }))
            .pipe(gulp.dest(project.BuildPath+project.cssPath));
}

function bundle(){
  return gulp.src(project.BasePath+'app.js') // Load Bundle.config file [bundle,copy]
          .pipe(plugins.bundleAssets())
          .pipe(plugins.bundleAssets.results(project.SrcPath+'datas/')) // arg is destination of bundle.result.json
          .pipe(plugins.cached('bundle'))
          .pipe(gulp.dest(project.bundleConfig.dest))
          .pipe(browserSync.stream())
          .pipe(plugins.notify('Bundle is ready !'));
}

gulp.task('default', gulp.series(libsass,autoprefixer,bundle));



// exports.test = module.test;
// ASSETS MANAGMENT
//
// gulp.task('bundle-assets', getTask('bundle-assets'));
//
// // Update/install icon fonts
// gulp.task('fontello', getTask('fontello'));
//
// // PREPROCSS
// // gulp.task('lib-sass', getTask('lib-sass'));
// //exports.libsass = getTask('lib-sass');
// gulp.task('styles', getTask('styles'));
// // CSS TOOLS
// gulp.task('autoprefixer', getTask('autoprefixer'));
// gulp.task('combineMQ', getTask('combineMQ'));



// SVG Sprites / Icon system
// https://www.npmjs.com/package/gulp-svg-sprites
// gulp.task('build_icon-set', getTask('build_icon-set'));

// IMAGES TOOLS
// gulp.task('image-touch-icons', getTask('img_touch-icons')); // Generate touch icons
// gulp.task('image-optim', getTask('img_image-optim')); // Optimize
// gulp.task('image-resize', getTask('img_image-resize')); // Resize image to a max Size
// gulp.task('image-responsives', getTask('img_responsives')); // Generate images variations for different brealpoints
// gulp.task('image-galleries', getTask('img_galleries')); // Generate thumbs
// // TEMPLATING
// gulp.task('mjml', getTask('mjml'));
// gulp.task('swig', getTask('swig'));

//gulp.task('static-site', getTask('static-site'));
// Utils

// gulp.task('html2build', function() {
//     gulp.src(SrcPath+'**/*.html')
//         .pipe($.plumber({
//                 errorHandler: onError
//         }))
//         .pipe($.cached('html'))
//         .pipe(gulp.dest(project.BuildPath))
//         .pipe(browserSync.stream())
//         .pipe($.notify({
//             title: "Html Updated",
//             message: "Html files are updated in Build Folder"
//         }));
// });

// gulp.task('images2build', function() {
//     gulp.src(SrcPath + project.ImagePath + '**/*.{jpg,jpeg,png,gif,svg}')
//         .pipe($.plumber({
//                 errorHandler: onError
//         }))
//         .pipe($.cached('images'))
//         .pipe(gulp.dest(project.BuildPath + project.ImagePath))
//         .pipe(browserSync.stream())
//         .pipe($.notify({
//             title: "Images folder Updated",
//             message: "All images files are updated in Build Folder"
//         }));
// });


// gulp.task('assets2build', function() {
//     gulp.src(SrcPath+'**/*.{css,js}')
//         .pipe($.plumber({
//                 errorHandler: onError
//         }))
//         .pipe($.cached('assets'))
//         .pipe(gulp.dest(project.BuildPath))
//         .pipe(browserSync.stream())
//         .pipe($.notify({
//             title: "Assets Updated",
//             message: "Assets files are updated in Build Folder"
//         }));
// });



// browser-sync task for starting the server.
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: project.SrcPath
//         }
//     });
// });

// ---------------------------------------------------------------------------
// # COMMANDS
// ---------------------------------------------------------------------------


/** # Build static site
 *
 * Génère un site static
 *
 *
 */
//gulp.task('static-site', ['lib-sass', 'swig', 'bundle-assets','image-galleries','image-responsives','image-touch-icons','images2build'], function () {
//
//    browserSync.init({
//        server: project.BuildPath
//    });
//
//    gulp.watch(project.SrcPath+project.sassPath+"/**/*.scss", ['lib-sass', 'autoprefixer','assets2build']);
//    gulp.watch(project.SrcPath+"templates/*.twig", ['swig']);
//    gulp.watch(project.SrcPath+"datas/**/*.json", ['swig']);
//    gulp.watch(project.SrcPath+project.ImagePath+"**/*.{jpg,jpeg,png,gif}", ['images2build']);
//    gulp.watch(project.SrcPath+project.galleries.folder+"**/*.{jpg,jpeg,png,gif}", ['image-galleries']);
//    gulp.watch(project.SrcPath+"**/*.html", ['html2build']);
//    gulp.watch(project.SrcPath+"**/*.{css,js}", ['assets2build']);
//});

/** # Prototype
 *
 *
 */
// gulp.task('prototype', ['lib-sass', 'swig', 'bundle-assets', 'images2build'], function () {
//
//     browserSync.init({
//         server: project.BuildPath
//     });
//
//     gulp.watch(project.SrcPath+project.sassPath+"/**/*.scss", ['lib-sass', 'autoprefixer','combineMQ','assets2build']);
//     gulp.watch(project.SrcPath+'**/*.{css,js}', ['bundle-assets']);
//     gulp.watch(project.SrcPath+"templates/*.twig", ['swig']);
//     gulp.watch(project.SrcPath+"datas/**/*.json", ['swig']);
//     gulp.watch(project.SrcPath+project.ImagePath+"**/*.{jpg,jpeg,png,gif}", ['images2build']);
//     gulp.watch(project.SrcPath+"**/*.html", ['html2build']);
//     gulp.watch(project.SrcPath+"**/*.{css,js}", ['assets2build']);
//
// });

// ## Sass-watch
// gulp.task('sass-watch', ['lib-sass','autoprefixer', 'combineMQ'], function () {
//     gulp.watch(project.SrcPath+project.sassPath+"/**/*.scss", ['lib-sass', 'autoprefixer', 'combineMQ']);
// });

// ## Sass-watch
// gulp.task('email-builder', ['mjml'], function () {
//     browserSync.init({
//         server: project.BuildPath + 'emails/'
//     });
//     gulp.watch(project.SrcPath+"emails/*.mjml", ['mjml']);
//     gulp.watch(project.BuildPath + "emails/*.html").on('change', browserSync.reload);
// });
//
// gulp.task('prefix', ['autoprefixer'], function () {
//     gulp.watch(project.SrcPath+project.cssPath+"/**/*.css", ['autoprefixer']);
// });




// function test(){
//   return gulp.src(project.SrcPath + project.sassPath+'**/*.scss')
//           // Error Handler
//           .pipe(plugins.plumber({
//               errorHandler: onError
//           }))
//           // Sass
//           .pipe(plugins.sass({
//               errLogToConsole: true,
//               outputStyle: project.sassOptions.outputStyle, // compressed | nested
//               //sourceComments:'none',
//               //sourceMap:'sass',
//               includePaths : project.includePaths
//           }))
//           .pipe(gulp.dest(project.SrcPath+project.cssPath));
//
// }
// exports.test = test;


 // Default Task
// gulp.task('default', ['lib-sass','bundle-assets','images2build'], function () {
//     // gulp.watch(project.SrcPath+project.sassPath+'**/*.scss', ['lib-sass', 'autoprefixer','combineMQ','bundle-assets']);
//     gulp.watch(project.SrcPath+project.sassPath+'**/*.scss', ['lib-sass', 'autoprefixer','bundle-assets']);
//     gulp.watch(project.SrcPath+'**/*.{css,js}', ['bundle-assets']);
//     gulp.watch(project.SrcPath+project.ImagePath+"**/*.{jpg,jpeg,png,gif,svg}", ['bundle-assets']);
//     // gulp.watch(project.SrcPath+"**/*.{css,js}", ['assets2build']);
//   	//	Quand on modifie un fichier js ou scss du framework on recalcule
//     // gulp.watch('_EXTENSIONS/fragments/fragments/src/**/*.{scss,js}', ['lib-sass', 'autoprefixer','combineMQ','bundle-assets']);
//     gulp.watch('_EXTENSIONS/fragments/fragments/src/**/*.{scss,js}', ['lib-sass', 'autoprefixer', 'bundle-assets']);
// });


//gulp.task('default', ['styles','bundle-assets','images2build'], function () {
//    gulp.watch(project.SrcPath+project.sassPath+'**/*.scss', ['styles','assets2build']);
//    gulp.watch(project.SrcPath+'**/*.{css,js}', ['bundle-assets']);
//    gulp.watch(project.SrcPath+project.ImagePath+"**/*.{jpg,jpeg,png,gif}", ['images2build']);
//    gulp.watch(project.SrcPath+"**/*.{css,js}", ['assets2build']);
//	//	Quand on modifie un fichier du framework on recalcule
//	gulp.watch('_EXTENSIONS/fragments/fragments/src/**/*.scss', ['styles','assets2build']);
//});

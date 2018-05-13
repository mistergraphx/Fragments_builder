/**  # Lib-SASS

Compilation de Fichiers scss
avec LibSass
si le NODE_ENV est production les sourcemaps sont externes,
par default au même niveau que la css généré,
on peut spécifier un autre chemin dans le fichier de config du projet

    sourcemaps: {
        path: ''
    }

- sourcemaps
- reload

@requires       node-sass
@see            https://github.com/sass/node-sass
@requires       gulp-sass
@see            https://www.npmjs.org/package/gulp-sass
@requires       gulp-source-maps
@see            https://www.npmjs.com/package/gulp-sourcemaps

*/
module.exports = function(gulp, plugins, project, sourcemaps, browserSync, onError) {

    // on initialise la variable par default pour le chemin des sourcemaps
    // par defaut vide pour les sourcemaps inlines
    var sourcemapsPath;

    if(process.env.NODE_ENV === 'production'){
        sourcemapsPath = './';
    }

    // Test si la config du projet a cette propriétées de definie
    if(project.hasOwnProperty("sourcemaps")
       && project.hasOwnProperty("sourcemaps.path")
       && project.sourcemaps !== 'undefined') {
            sourcemapsPath = project.sourcemaps.path;
    }


    // console.log('SourceMap Path : ' + sourcemapsPath);

    return function (){
        gulp.src(project.SrcPath + project.sassPath+'**/*.scss')
            // Error Handler
            .pipe(plugins.plumber({
                errorHandler: onError
            }))
            // Sourcemaps initialisation
            .pipe(sourcemaps.init())
			      // .pipe(sourcemaps.identityMap())
//            .pipe(sourcemaps.mapSources(function(sourcePath, file) {
//                // source paths are prefixed with '../src/'
//                //console.log(sourcePath);
//				return '../_scss/' + sourcePath;
//            }))
            // Sass
            .pipe(plugins.sass({
                errLogToConsole: true,
                outputStyle: project.sassOptions.outputStyle, // compressed | nested
                //sourceComments:'none',
                //sourceMap:'sass',
                includePaths : project.includePaths
            }))

			//Source map
			//----------
			//Problemes de chemins dans chrome
			//Exemple de tche gulp qui démontre les problème de chmins induis par l'enchainement de
			//pipes() sass|sourcemaps|autoprefixer
			//il semblerais que autoprefixer fausse le chemin des sources
			//https://github.com/ByScripts/gulp-sample/blob/master/gulpfile.js
			//
			//Ici on écrit la sourcemap par défaut dans le fichier
			//ceci permet de pouvoir avoir un chemin d'accès correct sous chrome
			//comme expliqué [ici](http://www.sitepoint.com/simple-gulpy-workflow-sass/)
			//conflit avec Suzy : https://github.com/floridoo/gulp-sourcemaps/issues/144#issuecomment-229044077
			//
			//Si besoin on peut spécifier un chemin, et des options supplémentaires pour une sourcemap externe
			//cf : https://www.npmjs.com/package/gulp-sourcemaps
			//Fri Oct 27 15:48:38 2017 - chrome a l'air de mieux supporter les sourcemaps externe on  génère donc un fichier .map externe
			//@todo vérifier le passage de la config depuis le projet
            .pipe(sourcemaps.write('./', {
      				//includeContent: false,
      				sourceRoot: '../_scss',
      				destPath: project.bundleConfig.dest ,
      				//sourceMappingURLprefix: project.bundleConfig.dest + 'assets/css'
      			}))
            // Output
            // ------
            //.pipe(gulp.dest(project.DevPath+project.cssPath))  // /!\ Attention on copie en Dev alors que Autoprefixer et combine mediaQueries ne sont pas passés
            .pipe(gulp.dest(project.SrcPath+project.cssPath))
            .pipe(browserSync.stream())
            .pipe(plugins.notify('Sass Files Compiled'));
    };
};

# Kitchen

Outil de prototypage , pre-processing, build system avec Node.js et gulp

## Fonctionalitées

- Pré-processeur css Sass et libsass
- Swig/twig templates
- Creation de bundles html/js/css minimisé et optimisés pour la production
- Traitement optimisation des images, creation des icons, favicons, mobile

## Structure 

_EXTENSIONS : dossier du framework personnel (des modules, outils, fonctions utilisables dans plusieurs projets différents.

_FRAMEWORKS : dossiers des frameworks vendeurs, maintenus ailleurs (bootstrap, bourbon, ...)

_KITCHEN : dossier de travail des projets

gulp-configs : dossier des fichiers de configuration `_PROJECT_.js` des projets [1](fichier de configuration).

gulp-tasks : dossier des taches gulp.

gulpfile.js : le gestionnaire de taches

## Utilisation

*   `gulp --project=PROJECT_NAME`  - Tache par defaut : lib-sass, combine, auto-prefixer, bundle assets
*   `gulp run-starter --project=PROJECT_NAME` - Live reload, swig, libsass


### Installation

Pour installer node et le mettre a jour facilement utiliser de préférence nvm (node version manager), via Brew


### Update

Mettre a jour les nodes modules :

cd project_folder/
sudo npm outdated
sudo npm update gulp-sass

Pour forcer une update d'une version supérieure : exemple de 1.0x vers 2.0x

sudo npm remove module_name
sudo npm install module_name


## Projets

On crée un dossier par projet (site, app).

### Système de fichier du projet

Exemple :

* 	assets/
	*	sass/
	*	css/
	*	fonts/
	*	images/
	*	js/
* 	datas/ *Dossier des fichiers `json` des datas des templates swig*
* 	templates/ *Dossier des templates swig*
	*	layouts/
	*	partials/
	*	index.twig	
* .bowerrc 
* app.json
* bower.json
* bundle.config.js

Exemple 2 :

*	_sass
*	build-folder |squelettes
	* assets/
		*	css/
		*	js/



### Structure du fichier _PROJECT_.js

Le fichier décrit les chemins et options de compilation du projet.

**UPDATE: Tous les chemins finissent par un /**

```	.js}

module.exports =function(){
    return _PROJET_ = {
        'SrcPath' : '_KITCHEN/_PROJET_/',
        'BuildPath': '_KITCHEN/_PROJET_/_BUILD/',
        'DevPath': '_KITCHEN/_PROJET_/templates/project/',
        'JsPath':'assets/js/',
        'ImagePath':'assets/images/',
        'sassPath':'assets/_sass',
        'sassOptions':{
            'outputStyle':'nested' // compressed, nested
        },
        'cssPath':'assets/css/',
        'templatesPath':'templates/',
        bundleConfig: {
        	pathPrefix: 'squelettes/' // installation en prod dans un sous répertoire
    	},
        'includePaths':[
            '_FRAMEWORKS/Bourbon-family/',
        ]
    }
}

```




## CHANGELOG

Wed Sep 30 09:04:19 2015 :
- ajout de gulp-cached pour la mise en cache des fichiers sur les taches de copie
- brownserSync reload sur la modification des fichiers html lors de la tache proto
- ajout d'une tache html2build pour mettre a jour les fichiers html générés par swig

06 01 2015 :
- modification sur les chemins dans la configuration des projet
- ajout d'une configuration project.bundleConfig.pathPrefix 


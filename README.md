# Fragments Builder

Outil de prototypage , pre-processing, build system avec Node.js et gulp

## Fonctionalitées

- Pré-processeur css Sass et libsass
- Swig/twig templates
- Creation de bundles html/js/css minimisé et optimisés
- Traitement optimisation des images, creation des icons, favicons, mobile

## Structure 

* _EXTENSIONS/ : dossier du framework personnel (des modules, outils, fonctions utilisables dans plusieurs projets différents.

* _FRAMEWORKS/ : dossiers des frameworks vendeurs, maintenus ailleurs (bootstrap, bourbon, ...)

* _KITCHEN/ : dossier de travail des projets

* gulp-tasks/ : dossier des taches gulp.

* gulpfile.js : le gestionnaire de taches

## Utilisation

*   `gulp --project=PROJECT_NAME`  - Tache par defaut : lib-sass, combineMQ, auto-prefixer, bundle assets
*   `gulp prototype --project=PROJECT_NAME` - Live reload, swig, libsass
*   `gulp image-optim --project=PROJECT_NAME` - Run optimize image tasks

### Installation

Pour installer node et le mettre a jour facilement utiliser de préférence nvm (node version manager), via Brew


### Update

Mettre a jour les nodes modules :

```
cd project_folder/
sudo npm outdated
sudo npm update gulp-sass
```

Pour forcer une update d'une version supérieure : exemple de 1.0x vers 2.0x

```
sudo npm remove module_name
sudo npm install module_name
```

## Projets

Les projets sont stockés dans _KITCHEN/

Un app-boileplate fourni la base ci dessous.

### Structure du projet

Exemple :

* _BUILD/
* _src/
    *	_scss/
    * 	assets/
        *	css/
        *	fonts/
        *	images/
        *	js/
    * 	datas/ *Dossier des fichiers `json` des datas des templates swig*
    * 	templates/ *Dossier des templates swig*
        *	_layouts/
        *	_partials/
        *	index.twig	
* app.js







## CHANGELOG




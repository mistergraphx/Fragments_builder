# Fragments Builder

Outil de prototypage , pre-processing, build system avec Node.js et gulp

## Fonctionalitées

- Pré/Post processeur css (libsass, Autoprefixer)
- Template engine Nunjuks templates
- Creation de bundles html/js/css minimisé et optimisés
- Création de sprites svg

## Structure

* _EXTENSIONS/ : dossier du framework personnel (des modules, outils, fonctions utilisables dans plusieurs projets différents.

* _FRAMEWORKS/ : dossiers des frameworks vendeurs, maintenus ailleurs (bootstrap, bourbon, ...)

* _KITCHEN/ : dossier de travail des projets

* gulp-tasks/ : dossier des taches gulp.

* gulpfile.js : le gestionnaire de taches

## Utilisation

Main Tasks :

*   `gulp --project=PROJECT_NAME`  - Tache par defaut : [Styles] lib-sass, postCss auto-prefixer, bundle assets
*   `gulp static-site --project=PROJECT_NAME` - Live reload, nunjuks, libsass
*   `gulp config --project` - Retourne la config actuelle du projet

### Installation

Pré-requis :

avoir intallé Node (> v6)


## Projets

Les projets sont stockés dans _KITCHEN/

Un app-boileplate fourni la base ci dessous.

### Structure du projet

Exemple :

* _BUILD/
* _src/
    * 	assets/
        *	_scss/
        *	css/
        *	fonts/
        *	images/
        *	js/
    * 	datas/ : *Dossier des fichiers `json` des datas des templates*
    *   pages/ : Fichers markdown de contenu
    * 	templates/ : *Dossier des templates*
        *	_layouts/
        *	_partials/
        *	index.njk
* app.js


## CHANGELOG

version 2.0.0

- remplacement de swig par Nunjuks
- Passage a postCss pour Autoprefixer et les post traitement css après libSass
- refonte de la configuration des projets
- les noms des dossiers de travail, ainsi que les chemins passe en Globales

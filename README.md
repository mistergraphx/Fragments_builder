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

Main Tasks :

*   `gulp --project=PROJECT_NAME`  - Tache par defaut : lib-sass, auto-prefixer, bundle assets
*   `gulp prototype --project=PROJECT_NAME` - Live reload, swig, libsass

Sub Tasks :

*   `gulp bundle-assets --project=PROJECT_NAME` -
*   `gulp autoprefixer --project=PROJECT_NAME` -
*   `gulp combineMQ --project=PROJECT_NAME` -
*   `gulp swig --project=PROJECT_NAME` -
*   `gulp fontello --project=PROJECT_NAME` -
*   `gulp image-optim --project=PROJECT_NAME` - Run optimize image tasks
*   `gulp image-resize --project=PROJECT_NAME` -
*   `gulp image-responsives --project=PROJECT_NAME` -


### Installation

Pour installer node et le mettre a jour facilement utiliser
de préférence nvm (node version manager), via Brew.

    sudo npm install

### Update

###

### Mettre a jour les nodes modules :

```
cd project_folder/
sudo npm outdated
sudo npm update gulp-sass
```

Pour forcer une update d'une version supérieure : exemple de 1.0x vers 2.0x
en mettant a jour le package.json

```
sudo npm uninstall <module_name>
sudo npm install <module_name>
```

### Upgrade et mise a jour du projet/package.json

Installer npm-check-update pour gérer les mises a jour plus simplement en ligne de commande :

https://www.npmjs.com/package/npm-check-updates

```
npm install -g npm-check-updates
```

Usage

ncu -a : *Upgrade all* met a jour le package.json avec les dernières versions des modules
ncu -u : met a jour les modules qui sont outdated

on lance ensuite la maj de tout les modules et dépendances avec `sudo npm update`


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
    * 	datas/ : *Dossier des fichiers `json` des datas des templates swig*
    * 	templates/ : *Dossier des templates swig*
        *	_layouts/
        *	_partials/
        *	index.twig
* app.js


## CHANGELOG

version 0.1.0

Mise a jour des modules Node.js

Gestion de configurations


Sun Apr 10 19:17:39 2016
:   *   Add html minification in swig task
        gulp-htmlmin
        https://www.npmjs.com/package/gulp-htmlmin
    *   Swig dest in BuildPath

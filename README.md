# Fragments Builder

Outil de prototypage , pre-processing, build system avec Node.js et gulp

## Fonctionalitées

### Pré/Post processeur css

(libsass, Autoprefixer)

### Jekill like pages

Template engine : Nunjuks templates

### Bundler

Creation de bundles html/js/css minifiés et optimisés suivant l'environnement


### Svg Utils

Création de sprites svg

Extraction de fichiers svg depuis une font svg (utilitaire de convertion pour passer progressivement aux sprites svg);


## Structure

* _EXTENSIONS/ : dossier du framework personnel (des modules, outils, fonctions utilisables dans plusieurs projets différents).

* _FRAMEWORKS/ : dossiers des frameworks vendeurs, libs scss, maintenus ailleurs (bootstrap, bourbon, susy ...), et que vous partagez dans plusieurs projets.

* _JS_LIBS/ : idem mais pour les libs js

* _MATERIALS/ : resources svg, icons, templates

* _KITCHEN/ : dossier de travail des projets

* gulp-tasks/ : dossier des taches gulp.

* gulpfile.js : le gestionnaire de taches

## Projet

Le projet est le seul argument passé au taches, c'est ce qui défini le chemin ou d'ou sera chargé le fichier app.js permettant de modifier les paramètres par défaut (cf. _config-default.js).

Créer un dossier et un fichier app.js.

```shell
# Nouveau projet
cp -r _KITCHEN/_app-boilerplates/starter _KITCHEN/project_name
```

## Utilisation

Changer l'environnement pour les bundles générés

```
export NODE_ENV=[production,development]
```


###  Tache par defaut

`gulp --project=PROJECT_NAME`  
  [Styles] lib-sass, postCss auto-prefixer, bundle assets


*   `gulp static-site --project=PROJECT_NAME` - Live reload, nunjuks, libsass
*   `gulp config --project=PROJECT_NAME` - Retourne la config actuelle du projet
*   `gulp font-blast --project=PROJECT_NAME` - Extrait
### Installation

**Pré-requis : Node (> v6)**

```shell
# in your working directory,localhost folder create a folder for the Builder
# ex: _FACTORY
cd ~/Sites/_FACTORY
# Get the folder structure and tasks
git clone https://github.com/mistergraphx/Fragments_builder.git
# Install required node modules
npm install
```

## Projets

Les projets sont stockés dans _KITCHEN/


### Structure du projet

* _BUILD/
* _src/
    * 	assets/
        *	_scss/
        *	css/
        *	fonts/
        *	images/
        *	js/
    * 	datas/ : optionnel *Dossier des fichiers `json` optionnel de datas pour les pages*
    *   pages/ : optionnel Fichers markdown de contenu jekill like pages
    * 	templates/ optionnel : *Dossier des templates*
        *	_layouts/
        *	_partials/
        *	index.njk
* app.js

## Testing, Linting :

```
# Additionellement installer lighthouse
npm install -g lighthouse
cd _KITCHEN/mon_projet/
lighthouse http://mon_projet.local [--view: ouvre directement dans le navigateur le rapport .]
```



## CHANGELOG

v2.0.1

- maj des dependances
- [test] ajout de fontblast et d'une tache qui extrait les svg d'une font svg, afin de les réutiliser ensuite avec la tache sprite.
Pour les projets basé sur fragments on récupère en plus la glyph depuis les settings scss $icon-set, afin de pouvoir renommer correctement les fichiers svg générés.

v2.0.0

- remplacement de swig par Nunjuks
- Passage a postCss pour Autoprefixer et les post traitement css après libSass
- refonte de la configuration des projets
- les noms des dossiers de travail, ainsi que les chemins passe en Globales

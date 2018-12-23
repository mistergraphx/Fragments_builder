"use strict";
/**  # FontBlast

Actuellement extraction de svg depuis une icone font.svg

svgFont : font utilisé par FontBlast pour extraire les svg
la glyph : fichier contenant les correspondance caractère code = character name servant a remapper les noms de fichier

ex: cas de Fragments : est récupéré depuis le fichier scss et la maps icon-set()

  $icon-set(
    charName : 'charCode',
  );

voir les exemples de l'auteur de fontBlast pour d'autre type de polices

la génération de png ne fonctionne pas utilisant batik-rasterizer (mcosx 10.11 node 10.2.1)

@see https://github.com/eugene1g/font-blast
@see https://github.com/eugene1g/font-blast-examples/blob/master/popular-fonts.js

*/
var svgFont2svgFiles = function(config) {

  let fontBlast = require('font-blast')
      readline = require('readline'),
      fs = require('fs');

  var sourceFont = config.SrcPath + 'assets/fonts/icons/font/icons.svg',
      glyph = config.SrcPath + 'assets/fonts/icons/glyph.scss',
      destPath = config.SrcPath + 'assets/svg/';

  var contents = fs.readFileSync(glyph, 'utf8');
  var definitionsLines = contents.match(/([\w-]*?):.*?'\\(.*?)',/g),
      convertFilenames = {};

      definitionsLines.forEach(function (line) {
        var charName = line.match(/([\w\-].*?):/),
            charCode = line.match(/'\\([\w\d].*?)',/);

        convertFilenames[charCode[1]] = charName[1];
      });

      async function convert(){
           fontBlast(sourceFont, destPath, {filenames: convertFilenames});
      }
      async function done(){
          fs.unlink(destPath + 'source-font.ttf', ()=>{});
          fs.unlink(destPath + 'verify.html', ()=>{});
          console.log('Nettoyage des fichiers de verification sourceFont.ttf , verify générés par fontBlast');
      }

      return async function(){
        await convert();
        await done();
        return false;
      }
};

module.exports = svgFont2svgFiles;

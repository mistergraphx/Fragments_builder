

// Set the NODE_ENV when calling your gulp task
// export NODE_ENV=production
var prodLikeEnvs = ['production', 'staging'];

module.exports = {
  // File system
  BasePath: _BASE_PATH,
  SrcPath: _BASE_PATH + '_src/',
  BuildPath: _BASE_PATH + _BUILD_DIR,
  // Plugins options
  sass: { // https://github.com/sass/node-sass#options
    errLogToConsole: true,
    outputStyle: 'nested', // nested, expanded, compact, compressed
    includePaths: []
  },
  autoprefixer:{
      browsers: ['last 2 versions'],
      cascade: false
  },
  mqpacker: {
    sort: true
  },
  sourcemaps:{
      path: ''
  },
  svgSprite: {
    sourcesPath: _BASE_PATH + _SRC_DIR + 'assets/svg/',
    spriteDest: _BASE_PATH ,
    options: { // https://www.npmjs.com/package/gulp-svg-sprites#options
      mode: "symbols", // sprite|defs|symbols
      common: "icon",
      selector: "%f",
      layout: "vertical", // horizontal|diagonal
      svgId: "%f",
      cssFile: _SRC_DIR + _SASS_DIR + "_sprite.scss", // Only in sprite mode
      baseSize: 64,
      templates: {
        scss: require("fs").readFileSync("gulp-tasks/tmpl/sprite.scss", "utf-8"),
      },
      // Custom files names & path relative to spriteDest
      svg: {
        symbols: _BUILD_DIR + "assets/images/symbols.svg"
      },
      preview: { // or false
        symbols: _SRC_DIR + "templates/symbols_demo.twig"
      }
    }
  },
  bundleResults:{
        dest: '',
        // précéder le path de l'url de prod pour que les chemins soit correct
        // y compris quand on parcours l'arborescence des pages
        pathPrefix: '/',
        fileName: 'bundle.results'
  },
  bundle: {

  },
  copy: [

  ]
};

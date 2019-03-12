

// Set the NODE_ENV when calling your gulp task
// export NODE_ENV=production
var prodLikeEnvs = ['production', 'staging'];

module.exports = {
  // File system
  BasePath: _BASE_PATH,
  SrcPath: _BASE_PATH + _SRC_DIR,
  BuildPath: _BASE_PATH + _BUILD_DIR,
  sassPath: _SRC_PATH + _SASS_DIR,
  // Plugins options
  sass: { // https://github.com/sass/node-sass#options
    errLogToConsole: true,
    outputStyle: 'compact', // nested, expanded, compact, compressed
    includePaths: []
  },
  autoprefixer:{
      browsers: ['last 2 versions'],
      cascade: false
  },
  // unused
  mqpacker: {
    sort: true
  },
  // En test
  doiuse: {
    browsers:['ie >= 11'],
    ignore: ['rem'], // an optional array of features to ignore
    ignoreFiles: ['**/normalize.css'], // an optional array of file globs to match against original source file path, to ignore
    onFeatureUsage: function(usageInfo) {
      console.log(usageInfo.message);
    }
  },
  sourcemaps:{
      path: './',
      sourceRoot: '../_scss'
  },
  fontblast:{
    sourceFont: _SRC_PATH + 'assets/fonts/icons/font/icons.svg',
    glyph: _SRC_PATH + 'assets/fonts/icons/glyph.scss',
    destPath: _BUILD_PATH + 'fontblast/',
    cleanAfter: false
  },
  svgSprite: {
    sourcesPath: _SRC_PATH + 'assets/svg/',
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
  // https://marked.js.org/#/USING_ADVANCED.md
  markedConfig: {
    // highlight: function (code) {
    //     return require('highlight.js').highlightAuto(code).value;
    // },
      baseUrl: null, // A prefix url for any relative link
      gfm: true, // Enable GitHub flavored markdown.
      tables: true, // Enable GFM tables. This option requires the gfm option to be true.
      breaks: false, // Enable GFM line breaks. This option requires the gfm option to be true.
      pedantic: false,
      sanitize: false, // Sanitize the output. Ignore any HTML that has been input.
      smartLists: true,
      smartypants: false // Use "smart" typograhic punctuation for things like quotes and dashes.
  },
  frontmatterConfig: {
      language:'yaml',
      delimiters:'---' // Default
  },
  nunjuks:{
      defaultTemplatesPath: _SRC_PATH + _TEMPLATES_DIR,
      searchPaths: [
        _SRC_PATH + _TEMPLATES_DIR,
        _SRC_PATH + _IMG_DIR
      ],
      templateExt: '.njk',
      options: {
        autoescape:false,
        throwOnUndefined: false
      }
  },
  bundleConfig:{
        dest: '',
        // précéder le path de l'url de prod pour que les chemins soit correct
        // y compris quand on parcour l'arborescence des pages
        // pathPrefix: 'http:localhost:3000/',
        pathPrefix: '/',
        fileName: 'bundle.result'
  },
  bundle: {

  },
  copy: [

  ]
};

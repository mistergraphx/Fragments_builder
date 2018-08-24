

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
  sourcemaps:{
      path: ''
  },
  autoprefixer:{
      browsers: ['last 2 versions'],
      cascade: false
  },
  mergeMediaQueries: {
    log: false,
    externals: false
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

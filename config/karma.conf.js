// Karma configuration
const scssRules = require('./lib/scssRules')
const jsRules = require('./lib/jsRules')
const { PROJECT_DIR, jsModulePaths } = require('./lib/dirs')

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: PROJECT_DIR,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'test/**/test_*.js',
      'src/**/__specs__/*.test.js',
      { pattern: 'test/assets/**/*', included: false, served: true }
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
      'src/**/__specs__/*.test.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          jsRules,
          scssRules
        ]
      },
      resolve: {
        extensions: ['.js'],
        modules: jsModulePaths
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['MyChrome'],

    customLaunchers: {
      MyChrome: {
        base: 'Chrome',
        flags: ['--window-size=640,400']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true

    // Concurrency level
    // how many browser should be started simultaneous
    // concurrency: Infinity
  })
}

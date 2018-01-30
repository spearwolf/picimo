const path = require('path')
const webpack = require('webpack')

const createDevServer = require('./lib/createDevServer')
const scssRules = require('./lib/scssRules')
const jsRules = require('./lib/jsRules')('legacy')
const { PROJECT_DIR, jsModulePaths } = require('./lib/dirs')

const TESTRUNNER_DIR = path.resolve(PROJECT_DIR, 'testrunner')

module.exports = {
  entry: {
    tests: path.resolve(TESTRUNNER_DIR, 'tests', 'index.js'),
    setup: path.resolve(TESTRUNNER_DIR, 'setup.js'),
    'bootstrap/tests': path.resolve(TESTRUNNER_DIR, 'bootstrap', 'tests', 'index.js'),
    'bootstrap/setup': path.resolve(TESTRUNNER_DIR, 'bootstrap', 'setup.js')
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      PICIMO_ENV: JSON.stringify('development')
    })
  ],
  devServer: createDevServer({ port: 9090, contentBase: TESTRUNNER_DIR }),
  module: {
    rules: [
      jsRules,
      scssRules
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
    modules: jsModulePaths
  }
}

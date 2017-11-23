const path = require('path')

const createDevServer = require('./lib/createDevServer')
const scssRules = require('./lib/scssRules')
const jsRules = require('./lib/jsRules')

const BASE_DIR = path.resolve(__dirname, '..')
const TESTRUNNER_DIR = path.resolve(BASE_DIR, 'testrunner')

module.exports = {
  entry: {
    tests: path.resolve(TESTRUNNER_DIR, 'tests', 'index.js'),
    setup: path.resolve(TESTRUNNER_DIR, 'setup.js')
  },
  output: {
    filename: '[name].js'
  },
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
    modules: [
      path.resolve(BASE_DIR, 'src'),
      path.resolve(BASE_DIR, 'node_modules')
    ]
  }
}

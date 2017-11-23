const path = require('path')

const scssRules = require('./lib/scssRules')
const jsRules = require('./lib/jsRules')

const PROJECT_DIR = path.resolve(__dirname, '..')
const BASE_DIR = path.resolve(__dirname, '../webgl-boilerplate')

module.exports = {
  entry: path.join(BASE_DIR, 'src/index.js'),
  devtool: 'eval-source-map',
  module: {
    rules: [
      jsRules,
      scssRules
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(PROJECT_DIR, 'src'),
      path.resolve(PROJECT_DIR, 'node_modules')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: BASE_DIR
  }
}

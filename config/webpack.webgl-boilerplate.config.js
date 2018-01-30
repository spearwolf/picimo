const path = require('path')
const webpack = require('webpack')

const scssRules = require('./lib/scssRules')
const jsRules = require('./lib/jsRules')('legacy')
const { PROJECT_DIR, jsModulePaths } = require('./lib/dirs')

const BASE_DIR = path.resolve(PROJECT_DIR, 'webgl-boilerplate')

module.exports = {
  entry: path.join(BASE_DIR, 'src/index.js'),
  devtool: 'eval-source-map',
  module: {
    rules: [
      jsRules,
      scssRules
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PICIMO_ENV: JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ['.js'],
    modules: jsModulePaths
  },
  output: {
    filename: 'bundle.js',
    path: BASE_DIR
  }
}

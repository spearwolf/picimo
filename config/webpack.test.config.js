const path = require('path')

const scssRules = require('./lib/scssRules')
const jsRules = require('./lib/jsRules')

const BASE_DIR = path.resolve(__dirname, '..')

module.exports = {
  module: {
    rules: [
      jsRules,
      scssRules
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(BASE_DIR, 'src'),
      path.resolve(BASE_DIR, 'node_modules')
    ]
  }
}

const config = require('../config')

module.exports = config({
  variant: 'es6-module',
  preEntry: [
    'babel-polyfill'
  ],
  babelPresetEnvTargets: 'modern',
  output: {
    filename: 'picimo.mjs',
    libraryTarget: 'var'
  }
})

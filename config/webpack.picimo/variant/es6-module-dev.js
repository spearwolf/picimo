const config = require('../config')

module.exports = config({
  dev: true,
  variant: 'es6-module',
  preEntry: [
    'babel-polyfill'
  ],
  babelPresetEnvTargets: 'modern',
  output: {
    filename: 'dev/picimo-dev.mjs',
    libraryTarget: 'var'
  }
})

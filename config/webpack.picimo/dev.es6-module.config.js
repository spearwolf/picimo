const config = require('./common.config')

module.exports = config({
  dev: true,
  variant: 'es6-module',
  preEntry: [
    'babel-polyfill'
  ],
  presetEnvTargets: 'modern',
  output: {
    filename: 'dev/picimo-dev.mjs',
    libraryTarget: 'var'
  }
})

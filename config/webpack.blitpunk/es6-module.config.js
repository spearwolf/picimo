const config = require('./common.config')

module.exports = config({
  variant: 'es6-module',
  preEntry: [
    'babel-polyfill'
  ],
  presetEnvTargets: 'module',
  output: {
    filename: 'blitpunk.mjs',
    libraryTarget: 'var'
  }
})

const config = require('./webpack.lib.common.config')

module.exports = config({
  variant: 'legacy',
  preEntry: [
    'babel-polyfill',
    'whatwg-fetch'
  ],
  presetEnvTargets: {
    safari: 10,
    ios_saf: 10,
    ie: 11
  }
})

const config = require('../config')

module.exports = config({
  variant: 'legacy',
  preEntry: [
    'url-polyfill',
    'whatwg-fetch'
  ],
  babelPresetEnvTargets: 'legacy'
})

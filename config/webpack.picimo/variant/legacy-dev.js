const config = require('../config')

module.exports = config({
  dev: true,
  variant: 'legacy',
  preEntry: [
    'url-polyfill',
    'whatwg-fetch'
  ],
  babelPresetEnvTargets: 'legacy'
})

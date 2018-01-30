const config = require('./common.config')

module.exports = config({
  variant: 'legacy',
  preEntry: [
    'url-polyfill',
    'whatwg-fetch'
  ],
  presetEnvTargets: 'legacy'
})

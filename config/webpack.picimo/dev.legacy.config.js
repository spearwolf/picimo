const config = require('./common.config')

module.exports = config({
  dev: true,
  variant: 'legacy',
  preEntry: [
    'url-polyfill',
    'whatwg-fetch'
  ],
  presetEnvTargets: 'legacy'
})

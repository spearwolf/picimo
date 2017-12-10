const config = require('./common.config')

module.exports = config({
  variant: 'legacy',
  preEntry: [
    'whatwg-fetch'
  ],
  presetEnvTargets: 'legacy'
})

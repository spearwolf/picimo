const config = require('./common.config')

module.exports = config({
  dev: true,
  variant: 'legacy',
  preEntry: [
    'whatwg-fetch'
  ],
  presetEnvTargets: 'legacy'
})

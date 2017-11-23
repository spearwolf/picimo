const config = require('./webpack.lib.common.config')

module.exports = config({
  variant: 'legacy',
  preEntry: [
    'whatwg-fetch'
  ],
  presetEnvTargets: 'legacy'
})

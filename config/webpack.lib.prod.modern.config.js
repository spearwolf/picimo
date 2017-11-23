const config = require('./webpack.lib.common.config')

module.exports = config({
  variant: 'modern',
  presetEnvTargets: 'modern'
})

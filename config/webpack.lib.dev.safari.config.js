const config = require('./webpack.lib.common.config')

module.exports = config({
  dev: true,
  variant: 'safari',
  presetEnvTargets: 'safari'
})

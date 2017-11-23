const config = require('./webpack.lib.common.config')

module.exports = config({
  variant: 'modern',
  presetEnvTargets: {
    chrome: 60,
    firefox: 57
  }
})

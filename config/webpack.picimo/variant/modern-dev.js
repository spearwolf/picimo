const config = require('../config')

module.exports = config({
  dev: true,
  variant: 'modern',
  babelPresetEnvTargets: 'modern'
})

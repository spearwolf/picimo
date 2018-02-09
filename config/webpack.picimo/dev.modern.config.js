const config = require('./common.config')

module.exports = config({
  dev: true,
  variant: 'modern',
  babelOptions: {
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  presetEnvTargets: 'modern'
})

const config = require('./common.config')

module.exports = config({
  variant: 'modern',
  babelOptions: {
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  presetEnvTargets: 'modern'
})

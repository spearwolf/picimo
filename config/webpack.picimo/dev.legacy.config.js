const config = require('./common.config')

module.exports = config({
  dev: true,
  variant: 'legacy',
  preEntry: [
    'url-polyfill',
    'whatwg-fetch'
  ],
  babelOptions: {
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  presetEnvTargets: 'legacy'
})

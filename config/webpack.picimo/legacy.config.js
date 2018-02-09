const config = require('./common.config')

module.exports = config({
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

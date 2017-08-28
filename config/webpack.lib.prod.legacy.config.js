const config = require('./webpack.lib.common.config')

module.exports = config({
  preEntry: [
    'babel-polyfill',
    'whatwg-fetch'
  ],
  cacheDirectory: '.build/prod.legacy',
  babelOptions: {
    presets: [
      ['env', {
        loose: true,
        useBuiltIns: true,
        targets: {
          safari: 10,
          ios_saf: 10,
          ie: 11
        }
      }]
    ]
  },
  output: {
    filename: 'variants/blitpunk-legacy.js'
  }
})

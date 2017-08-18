const config = require('./webpack.lib.common.config')

module.exports = config({
  preEntry: [
    'babel-polyfill',
    'whatwg-fetch'
  ],
  cacheDirectory: '.build/dev.legacy',
  babelOptions: {
    presets: [
      ['env', {
        loose: true,
        debug: true,
        useBuiltIns: true,
        targets: {
          safari: 10,
          ios_saf: 10,
          ie: 11
        }
      }]
    ]
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'blitpunk-dev-legacy.js'
  }
})

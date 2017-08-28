const config = require('./webpack.lib.common.config')

module.exports = config({
  preEntry: [
    'babel-polyfill'
  ],
  cacheDirectory: '.build/dev.safari',
  babelOptions: {
    presets: [
      ['env', {
        loose: true,
        debug: true,
        useBuiltIns: true,
        targets: {
          safari: '10',
          ios_saf: '10'
        }
      }]
    ]
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'variants/blitpunk-dev-safari.js'
  }
})

const config = require('./webpack.lib.common.config')

module.exports = config({
  cacheDirectory: '.build/dev.modern',
  babelOptions: {
    presets: [
      ['env', {
        debug: true,
        loose: true,
        targets: {
          chrome: 60,
          firefox: 55
        }
      }]
    ]
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'variants/blitpunk-dev-modern.js'
  }
})

const config = require('./webpack.lib.common.config')

module.exports = config({
  cacheDirectory: '.build/prod.modern',
  babelOptions: {
    presets: [
      ['env', {
        loose: true,
        targets: {
          chrome: 60,
          firefox: 55
        }
      }]
    ]
  },
  output: {
    filename: 'blitpunk-modern.js'
  }
})

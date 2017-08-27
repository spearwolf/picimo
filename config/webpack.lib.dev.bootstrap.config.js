const config = require('./webpack.lib.common.config')

module.exports = config({
  entry: 'src/bootstrap.js',
  cacheDirectory: '.build/dev.bootstrap',
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
  output: {
    filename: 'blitpunk-dev.js'
  }
})
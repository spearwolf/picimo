const path = require('path')
const config = require('./webpack.lib.common.config')

module.exports = config({
  entry: 'src/bootstrap.js',
  cacheDirectory: '.build/dev.bootstrap',
  babelOptions: {
    plugins: [
      'syntax-dynamic-import'
    ],
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
    libraryTarget: 'window',
    path: path.resolve(__dirname, '../dist/dev'),
    filename: 'blitpunk-dev.js',
    chunkFilename: 'blitpunk-dev.[name].js',
    publicPath: '/blitpunk/dev/'
  }
})

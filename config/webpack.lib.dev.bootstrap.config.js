const path = require('path')
const config = require('./webpack.lib.common.config')

module.exports = config({
  dev: true,
  variant: 'bootstrap',
  entry: 'src/bootstrap.js',
  babelOptions: {
    plugins: [
      'syntax-dynamic-import'
    ]
  },
  presetEnvTargets: {
    safari: 10,
    ios_saf: 10,
    ie: 11
  },
  output: {
    libraryTarget: 'window',
    path: path.resolve(__dirname, '../dist/dev'),
    filename: 'blitpunk-dev.js',
    chunkFilename: 'blitpunk-dev.[name].[chunkhash].js',
    publicPath: '/blitpunk/dev/'
  }
})

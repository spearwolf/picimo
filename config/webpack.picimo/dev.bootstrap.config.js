const path = require('path')
const config = require('./common.config')

module.exports = config({
  dev: true,
  variant: 'bootstrap',
  entry: 'src/bootstrap/index.js',
  preEntry: [
    'babel-polyfill'
  ],
  babelOptions: {
    plugins: [
      'syntax-dynamic-import'
    ]
  },
  presetEnvTargets: 'legacy',
  output: {
    libraryTarget: 'window',
    path: path.resolve(__dirname, '../../dist/dev'),
    filename: 'picimo-dev.js',
    chunkFilename: 'picimo-dev.[name].[chunkhash].js',
    publicPath: '/picimo/dev/'
  }
})

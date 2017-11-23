const config = require('./webpack.lib.common.config')

module.exports = config({
  variant: 'bootstrap',
  entry: 'src/bootstrap.js',
  preEntry: [
    'babel-polyfill'
  ],
  blitpunkEnv: 'production',
  babelOptions: {
    plugins: [
      'syntax-dynamic-import'
    ]
  },
  presetEnvTargets: 'legacy',
  output: {
    libraryTarget: 'window',
    filename: 'blitpunk.js',
    chunkFilename: 'blitpunk.[chunkhash].js',
    publicPath: '/blitpunk/'
  }
})

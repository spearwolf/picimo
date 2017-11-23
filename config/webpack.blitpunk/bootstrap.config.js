const config = require('./common.config')

module.exports = config({
  variant: 'bootstrap',
  entry: 'src/bootstrap/index.js',
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

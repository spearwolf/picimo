const config = require('./common.config')

module.exports = config({
  variant: 'bootstrap',
  entry: 'src/bootstrap/index.js',
  preEntry: [
    'babel-polyfill'
  ],
  picimoEnv: 'production',
  babelOptions: {
    plugins: [
      'syntax-dynamic-import'
    ]
  },
  presetEnvTargets: 'legacy',
  output: {
    libraryTarget: 'window',
    filename: 'picimo.js',
    chunkFilename: 'picimo.[chunkhash].js',
    publicPath: '/picimo/'
  }
})

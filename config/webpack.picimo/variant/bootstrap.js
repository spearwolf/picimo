const config = require('../config')

module.exports = config({
  variant: 'bootstrap',
  entry: 'src/bootstrap/index.js',
  preEntry: [
    'babel-polyfill'
  ],
  picimoEnv: 'production',
  babelPresetEnvTargets: 'legacy',
  output: {
    libraryTarget: 'window',
    filename: 'picimo.js',
    chunkFilename: 'picimo.[chunkhash].js',
    publicPath: '/picimo/'
  }
})

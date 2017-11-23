const config = require('./webpack.lib.common.config')

module.exports = config({
  variant: 'bootstrap',
  entry: 'src/bootstrap.js',
  blitpunkEnv: 'production',
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
    filename: 'blitpunk.js',
    chunkFilename: 'blitpunk.[chunkhash].js',
    publicPath: '/blitpunk/'
  }
})

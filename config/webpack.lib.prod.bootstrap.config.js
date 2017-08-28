const config = require('./webpack.lib.common.config')

module.exports = config({
  entry: 'src/bootstrap.js',
  cacheDirectory: '.build/prod.bootstrap',
  blitpunkEnv: 'production',
  babelOptions: {
    plugins: [
      'syntax-dynamic-import'
    ],
    presets: [
      ['env', {
        loose: true,
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
    filename: 'blitpunk.js',
    chunkFilename: 'blitpunk.[name].js'
    // publicPath: '/js/'
  }
})

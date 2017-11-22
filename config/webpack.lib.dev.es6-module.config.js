const config = require('./webpack.lib.common.config')

module.exports = config({
  preEntry: [
    'babel-polyfill'
  ],
  cacheDirectory: '.build/dev.es6-module',
  babelOptions: {
    presets: [
      ['env', {
        loose: true,
        debug: true,
        useBuiltIns: true,
        targets: {
          // https://caniuse.com/#feat=es6-module
          edge: '16',
          firefox: '57',
          chrome: '61',
          safari: '10.1',
          ios_saf: '10.3'
        }
      }]
    ]
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'dev/blitpunk-dev.mjs',
    libraryTarget: 'var'
  }
})

const config = require('./webpack.lib.common.config')

module.exports = config({
  preEntry: [
    'babel-polyfill'
  ],
  cacheDirectory: '.build/prod.safari',
  babelOptions: {
    presets: [
      ['env', {
        loose: true,
        useBuiltIns: true,
        targets: {
          safari: '10',
          ios_saf: '10'
        }
      }]
    ]
  },
  output: {
    filename: 'blitpunk-safari.js'
  }
})

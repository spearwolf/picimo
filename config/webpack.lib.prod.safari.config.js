const config = require('./webpack.lib.common.config')

module.exports = config({
  variant: 'safari',
  preEntry: [
    'babel-polyfill'
  ],
  presetEnvTargets: {
    safari: '10',
    ios_saf: '10'
  }
})

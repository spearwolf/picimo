const config = require('./common.config')

module.exports = config({
  variant: 'es6-module',
  preEntry: [
    'babel-polyfill'
  ],
  babelOptions: {
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  presetEnvTargets: 'module',
  output: {
    filename: 'picimo.mjs',
    libraryTarget: 'var'
  }
})

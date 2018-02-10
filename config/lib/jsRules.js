const { babelEnvTargets, babelPlugins, babelExclude } = require('../babel')

const exclude = babelExclude()
const plugins = babelPlugins()

module.exports = (variant = 'legacy') => ({
  exclude,
  test: /\.js$/,
  loader: 'babel-loader?cacheDirectory=.build',
  options: {
    plugins,
    babelrc: false,
    presets: [
      ['env', {
        targets: babelEnvTargets(variant),
        debug: false,
        loose: true
      }]
    ]
  }
})

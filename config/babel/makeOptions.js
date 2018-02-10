const babelEnvTargets = require('./envTargets')
const babelPlugins = require('./plugins')

module.exports = (babelOptions, presetEnvTargets, dev) => {
  const options = Object.assign({ babelrc: false }, babelOptions)

  if (!options.plugins) options.plugins = babelPlugins()

  if (presetEnvTargets) {
    if (!options.presets) options.presets = []

    const targets = typeof presetEnvTargets === 'string'
      ? babelEnvTargets(presetEnvTargets)
      : presetEnvTargets

    options.presets.push([
      'env', {
        targets,
        debug: dev,
        loose: true,
        useBuiltIns: true
      }
    ])
  }

  return options
}

const babelEnvTargets = require('./envTargets')
const babelPlugins = require('./plugins')
const minifyPlugins = require('./minifyPlugins')

module.exports = (babelOptions, presetEnvTargets, isDevelopment) => {
  const options = Object.assign({ babelrc: false }, babelOptions)

  if (!options.plugins) options.plugins = babelPlugins(isDevelopment ? undefined : minifyPlugins)
  if (!options.presets) options.presets = []

  if (presetEnvTargets) {
    const targets = typeof presetEnvTargets === 'string'
      ? babelEnvTargets(presetEnvTargets)
      : presetEnvTargets

    options.presets.push([
      'env', {
        targets,
        debug: isDevelopment,
        loose: true,
        useBuiltIns: true
      }
    ])
  }

  return options
}

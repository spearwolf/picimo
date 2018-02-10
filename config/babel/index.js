const babelEnvTargets = require('./envTargets')
const babelPlugins = require('./plugins')
const babelExclude = require('./exclude')
const makeBabelOptions = require('./makeOptions')

module.exports = {
  babelEnvTargets,
  babelExclude,
  babelPlugins,
  makeBabelOptions
}

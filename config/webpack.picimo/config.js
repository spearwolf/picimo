const path = require('path')
const webpack = require('webpack')
const { babelExclude, makeBabelOptions } = require('../babel')
const outDir = path.resolve(__dirname, '../../dist')
const projectDir = path.resolve(__dirname, '../..')

const CACHE_DIR = '.build'

const getCacheDirectory = (dev, variant = '') => {
  const vari = variant ? `/${variant}` : ''
  return path.resolve(projectDir, `${CACHE_DIR}/${dev ? 'dev' : 'prod'}${vari}`)
}

const getDevtoolOption = (devtool, dev) => {
  if (devtool) return devtool
  if (dev) return 'inline-source-map'
}

const getOutputOptions = (output, variant, dev) => {
  const options = Object.assign({
    libraryTarget: 'umd',
    library: 'PICIMO'
  }, output)
  if (options.filename && !options.path) {
    options.path = outDir
  } else if (!options.filename && !options.path) {
    options.filename = `picimo-${variant}.js`
    options.path = getCacheDirectory(dev)
  }
  return options
}

module.exports = ({
  dev = false,
  preEntry = [],
  babelOptions,
  babelPresetEnvTargets = false,
  devtool = false,
  output,
  entry = 'src/picimo/index.js',
  plugins = [],
  picimoEnv,
  variant = false,
  defines
}) => ({
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      PICIMO_ENV: JSON.stringify(picimoEnv || (dev ? 'development' : 'production'))
    }, defines))
  ].concat(plugins),
  devtool: getDevtoolOption(devtool, dev),
  stats: 'normal',
  entry: preEntry.concat([path.join(projectDir, entry)]),
  module: {
    rules: [{
      test: /\.js$/,
      loader: `babel-loader?cacheDirectory=${getCacheDirectory(dev, variant)}`,
      exclude: babelExclude([
        /.build/
      ]),
      options: makeBabelOptions(babelOptions, babelPresetEnvTargets, dev)
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
        { loader: 'postcss-loader' }
      ]
    }]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(projectDir, 'src'),
      path.resolve(projectDir, 'node_modules'),
      getCacheDirectory(dev)
    ]
  },
  output: getOutputOptions(output, variant, dev)
})

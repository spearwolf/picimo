const path = require('path')
const webpack = require('webpack')
const babelEnvTargets = require('../babel.env.targets')
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

const getBabelOptions = (babelOptions, presetEnvTargets, dev) => {
  if (!presetEnvTargets) return babelOptions
  const options = babelOptions || {}
  if (!options.presets) options.presets = []
  const targets = typeof presetEnvTargets === 'string' ? babelEnvTargets[presetEnvTargets] : presetEnvTargets
  options.presets.push(['env', {
    targets,
    debug: dev,
    loose: true,
    useBuiltIns: true
  }])
  return options
}

const getOutputOptions = (output, variant, dev) => {
  const options = Object.assign({
    libraryTarget: 'umd',
    library: 'BLITPUNK'
  }, output)
  if (options.filename && !options.path) {
    options.path = outDir
  } else if (!options.filename && !options.path) {
    options.filename = `blitpunk-${variant}.js`
    options.path = getCacheDirectory(dev)
  }
  return options
}

module.exports = ({
  dev = false,
  preEntry = [],
  babelOptions,
  presetEnvTargets = false,
  devtool = false,
  output,
  entry = 'src/blitpunk.js',
  plugins = [],
  blitpunkEnv,
  variant = false,
  defines
}) => ({
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      BLITPUNK_ENV: JSON.stringify(blitpunkEnv || (dev ? 'development' : 'production'))
    }, defines))
  ].concat(plugins),
  devtool: getDevtoolOption(devtool, dev),
  stats: 'normal',
  entry: preEntry.concat([path.join(projectDir, entry)]),
  module: {
    rules: [{
      test: /\.js$/,
      loader: `babel-loader?cacheDirectory=${getCacheDirectory(dev, variant)}`,
      exclude: [
        /node_modules/,
        /.build/
      ],
      options: Object.assign({ babelrc: false }, getBabelOptions(babelOptions, presetEnvTargets, dev))
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
      path.resolve(projectDir),
      path.resolve(projectDir, 'node_modules'),
      getCacheDirectory(dev)
    ]
  },
  output: getOutputOptions(output, variant, dev)
})

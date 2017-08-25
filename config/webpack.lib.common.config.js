const path = require('path')
const webpack = require('webpack')
const outDir = path.resolve(__dirname, '../dist')
const projectDir = path.resolve(__dirname, '..')

module.exports = ({
  preEntry = [],
  cacheDirectory,
  babelOptions,
  devtool = false,
  output,
  entry = 'src/blitpunk.js',
  plugins = [],
  blitpunkEnv = 'development'
}) => ({
  plugins: [
    new webpack.DefinePlugin({
      BLITPUNK_ENV: JSON.stringify(blitpunkEnv)
    })
  ].concat(plugins),
  devtool,
  stats: 'normal',
  entry: preEntry.concat([path.join(projectDir, entry)]),
  module: {
    rules: [{
      test: /\.js$/,
      loader: `babel-loader?cacheDirectory=${cacheDirectory}`,
      exclude: [
        /node_modules/
      ],
      options: Object.assign({ babelrc: false }, babelOptions)
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
      path.resolve(projectDir, 'node_modules')
    ]
  },
  output: Object.assign({
    path: outDir,
    libraryTarget: 'umd',
    library: {
      root: 'Blitpunk',
      amd: 'blitpunk',
      commonjs: 'blitpunk'
    }
  }, output)
})

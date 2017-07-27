const path = require('path')
const baseDir = path.resolve(__dirname, '../webgl-boilerplate')
const projectDir = path.resolve(__dirname, '..')

module.exports = {
  entry: path.join(baseDir, 'src/index.js'),
  devtool: 'eval-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=.build',
      exclude: [
        /node_modules/
      ]
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
  output: {
    filename: 'bundle.js',
    path: baseDir
  }
}

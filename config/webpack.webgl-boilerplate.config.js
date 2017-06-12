const path = require('path')
const baseDir = path.resolve(__dirname, '../webgl-boilerplate')

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
  output: {
    filename: 'bundle.js',
    path: baseDir
  }
}

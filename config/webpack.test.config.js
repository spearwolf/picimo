const path = require('path')
const baseDir = path.resolve(__dirname, '..')

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=.build/karma',
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
      path.resolve(baseDir),
      path.resolve(baseDir, 'node_modules')
    ]
  }
}

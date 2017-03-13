const path = require('path')
const baseDir = path.resolve(__dirname, '..')

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=.build',
      exclude: [
        /node_modules/
      ],
    }],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(baseDir),
      path.resolve(baseDir, 'node_modules')
    ]
  }
}

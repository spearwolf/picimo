const targets = require('../babel.env.targets').modern

module.exports = {
  test: /\.js$/,
  loader: 'babel-loader?cacheDirectory=.build',
  exclude: [
    /node_modules/
  ],
  options: {
    babelrc: false,
    presets: [
      ['env', {
        targets,
        debug: true,
        loose: true
      }]
    ]
  }
}

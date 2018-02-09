const babelEnv = require('../babel.env.targets')

module.exports = (variant = 'legacy') => ({
  test: /\.js$/,
  loader: 'babel-loader?cacheDirectory=.build',
  exclude: [
    /node_modules\/(?!@spearwolf)/
  ],
  options: {
    babelrc: false,
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread'
    ],
    presets: [
      ['env', {
        targets: babelEnv[variant],
        debug: false,
        loose: true
      }]
    ]
  }
})

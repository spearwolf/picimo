const path = require('path')
const outDir = path.resolve(__dirname, '../dist')
const projectDir = path.resolve(__dirname, '..')

module.exports = {
  entry: ['babel-polyfill', path.join(projectDir, 'src/blitpunk.js')],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=.build-dev',
      exclude: [
        /node_modules/
      ],
      options: {
        babelrc: false,
        presets: [
          ['env', {
            loose: true,
            debug: true,
            targets: {
              browsers: [
                'safari >= 10',
                'ios_saf >= 10',
                'firefox >= 55',
                'chrome >= 60',
                'ie 11'
              ]
            }
          }]
        ]
      }
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
  devtool: 'inline-source-map',
  output: {
    path: outDir,
    filename: 'blitpunk-dev.js',
    libraryTarget: 'umd',
    library: {
      root: 'Blitpunk',
      amd: 'blitpunk',
      commonjs: 'blitpunk'
    }
  }
}

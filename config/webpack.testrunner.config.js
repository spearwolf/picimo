const colors = require('colors')
const path = require('path')

const BASE_DIR = path.resolve(__dirname, '..')
const TESTRUNNER_DIR = path.resolve(BASE_DIR, 'testrunner')

module.exports = {
  entry: {
    tests: path.resolve(TESTRUNNER_DIR, 'tests', 'index.js')
  },
  output: {
    filename: '[name].js'
  },
  devServer: {
    port: 9090,
    host: '0.0.0.0',
    compress: true,
    contentBase: TESTRUNNER_DIR,
    before: (app) => {
      app.use((req, res, next) => {
        const m = req.path.match(/\/blitpunk(-dev)?(\.[^.]+)?\.js$/)
        if (m) {
          const target = path.join(m[1] ? 'dist/dev' : 'dist', `blitpunk${m[1] || ''}${m[2] || ''}.js`)
          console.log('GET', colors.bold.blue(req.path), '->', colors.bold.yellow(target))
          res.type('application/javascript')
          res.status(200).sendFile(path.join(BASE_DIR, target))
        } else {
          next()
        }
      })
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=.build-testrunner',
      exclude: [
        /node_modules/
      ],
      options: {
        babelrc: false,
        presets: [
          ['env', {
            debug: true,
            loose: true,
            targets: {
              chrome: 60,
              firefox: 55
            }
          }]
        ]
      }
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader', query: { sourceMaps: false } },
        { loader: 'postcss-loader' }
      ]
    }]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(BASE_DIR, 'node_modules')
    ]
  }
}

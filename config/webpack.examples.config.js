const _ = require('lodash')
const colors = require('colors')
const ejs = require('ejs')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const BASE_DIR = path.resolve(__dirname, '..')
const EXAMPLES_DIR = path.resolve(BASE_DIR, 'examples')

const EXAMPLES = _.compact(glob.sync(path.resolve(EXAMPLES_DIR) + '/*/').map(dir => {
  if (fs.lstatSync(dir).isDirectory()) {
    return /.*\/examples\/(.*)\/$/.exec(dir)[1]
  }
})).filter(name => name !== 'js')

console.log(`Serving blitpunk examples {\n${EXAMPLES.map(example => `  ${example}`).join('\n')}\n}`)

const template = fs.readFileSync(path.resolve(EXAMPLES_DIR, 'index.ejs.html'), 'utf8')
const html = ejs.render(template, { examples: EXAMPLES })
fs.writeFileSync(path.resolve(EXAMPLES_DIR, 'index.html'), html, 'utf8')

const entry = {}
// const plugins = []

EXAMPLES.forEach(example => {
  entry[example] = path.resolve(EXAMPLES_DIR, example, 'src/index.js')
  // plugins.push(
  //   new HtmlWebpackPlugin({
  //     filename: path.resolve(EXAMPLES_DIR, example, 'index.html'),
  //     chunks: [example]
  //   })
  // )
})

module.exports = {
  entry,
  // plugins,
  devServer: {
    port: 8080,
    compress: true,
    contentBase: EXAMPLES_DIR,
    setup: (app) => {
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
  output: {
    filename: '[name]/bundle.js',
    path: EXAMPLES_DIR
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=.build-examples',
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

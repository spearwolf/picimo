// const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const baseDir = path.resolve(__dirname, '..')
const examplesDir = path.resolve(baseDir, 'examples')
const glob = require('glob')
const fs = require('fs')
const ejs = require('ejs')
const _ = require('lodash')

const EXAMPLES = _.compact(glob.sync(path.resolve(examplesDir) + '/*/').map(dir => {
  if (fs.lstatSync(dir).isDirectory()) {
    return /.*\/examples\/(.*)\/$/.exec(dir)[1]
  }
}))

console.log('Found blitpunk examples {\n', EXAMPLES.map(example => `  ${example}`).join('\n'), '\n}')

const template = fs.readFileSync(path.resolve(examplesDir, 'index.ejs.html'), 'utf8')
const html = ejs.render(template, { examples: EXAMPLES })
fs.writeFileSync(path.resolve(examplesDir, 'index.html'), html, 'utf8')

const entry = {}
// const plugins = []

EXAMPLES.forEach(example => {
  entry[example] = path.resolve(examplesDir, example, 'src/index.js')
  // plugins.push(
  //   new HtmlWebpackPlugin({
  //     filename: path.resolve(examplesDir, example, 'index.html'),
  //     chunks: [example]
  //   })
  // )
})

module.exports = {
  entry,
  // plugins,
  output: {
    filename: '[name]/bundle.js',
    path: examplesDir
  },
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

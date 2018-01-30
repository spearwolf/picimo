const _ = require('lodash')
const ejs = require('ejs')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const webpack = require('webpack')

const createDevServer = require('./lib/createDevServer')
const scssRules = require('./lib/scssRules')
const jsRules = require('./lib/jsRules')('legacy')
const { PROJECT_DIR, jsModulePaths } = require('./lib/dirs')

const EXAMPLES_DIR = path.resolve(PROJECT_DIR, 'examples')

const EXAMPLES = _.compact(glob.sync(path.resolve(EXAMPLES_DIR) + '/*/').map(dir => {
  if (fs.lstatSync(dir).isDirectory()) {
    return /.*\/examples\/(.*)\/$/.exec(dir)[1]
  }
})).filter(name => name !== 'js')

console.log(`Serving picimo examples {\n${EXAMPLES.map(example => `  ${example}`).join('\n')}\n}`)

const template = fs.readFileSync(path.resolve(EXAMPLES_DIR, 'index.ejs.html'), 'utf8')
const html = ejs.render(template, { examples: EXAMPLES })
fs.writeFileSync(path.resolve(EXAMPLES_DIR, 'index.html'), html, 'utf8')

const entry = {}

EXAMPLES.forEach(example => {
  entry[example] = path.resolve(EXAMPLES_DIR, example, 'src/index.js')
})

module.exports = {
  entry,
  devServer: createDevServer({ port: 8080, contentBase: EXAMPLES_DIR }),
  output: {
    filename: '[name]/bundle.js',
    path: EXAMPLES_DIR
  },
  plugins: [
    new webpack.DefinePlugin({
      PICIMO_ENV: JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      jsRules,
      scssRules
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
    modules: jsModulePaths
  }
}

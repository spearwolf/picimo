const path = require('path')

const PROJECT_DIR = path.resolve(__dirname, '../..')

const jsModulePaths = [
  path.resolve(PROJECT_DIR, 'src'),
  path.resolve(PROJECT_DIR, 'node_modules')
]

const makeJsModulePaths = (...paths) => {
  return jsModulePaths.concat(
    paths.map(dir => path.resolve(PROJECT_DIR, dir)))
}

module.exports = {
  PROJECT_DIR,
  jsModulePaths,
  makeJsModulePaths
}

const path = require('path')

const PROJECT_DIR = path.resolve(__dirname, '../..')

const jsModulePaths = [
  path.resolve(PROJECT_DIR, 'src'),
  path.resolve(PROJECT_DIR, 'node_modules')
]

module.exports = {
  PROJECT_DIR,
  jsModulePaths
}

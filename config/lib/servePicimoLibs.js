const colors = require('colors')
const path = require('path')

const BASE_DIR = path.resolve(__dirname, '../..')

module.exports = (app) => {
  app.use((req, res, next) => {
    const m = req.path.match(/\/picimo(-dev)?(\..+)?\.(m)?js$/)
    if (m) {
      const target = path.join(m[1] ? 'dist/dev' : 'dist', `picimo${m[1] || ''}${m[2] || ''}.${m[3] || ''}js`)
      console.log('GET', colors.bold.blue(req.path), '->', colors.bold.yellow(target))
      res.type('application/javascript')
      res.status(200).sendFile(path.join(BASE_DIR, target))
    } else {
      next()
    }
  })
}

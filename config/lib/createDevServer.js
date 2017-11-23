const serverBlitpunkLibs = require('./serveBlitpunkLibs')

module.exports = ({ port, contentBase }) => ({
  contentBase,
  port,
  host: '0.0.0.0',
  compress: true,
  before: serverBlitpunkLibs
})

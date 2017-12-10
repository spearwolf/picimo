const serverPicimoLibs = require('./servePicimoLibs')

module.exports = ({ port, contentBase }) => ({
  contentBase,
  port,
  host: '0.0.0.0',
  compress: true,
  before: serverPicimoLibs
})

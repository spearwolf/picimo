const bowser = require('bowser')

export default () => {
  if (bowser.check({
    // TODO ios / safari
    firefox: '55',
    chrome: '58',
    opera: '46',
    vivaldi: '1.92'
  })) return true
  return false // return false if unsure
}

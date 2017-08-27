const bowser = require('bowser')

window.bowser = bowser

export default () => {
  if (!bowser.safari && !bowser.ios && bowser.check({
    firefox: '55',
    chrome: '58',
    opera: '46',
    vivaldi: '1.92'
  })) {
    return 'modern'
  }
  if (bowser.check({ safari: '10', ios: '10' })) {
    return 'safari'
  }
  return 'legacy'
}

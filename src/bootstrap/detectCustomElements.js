const bowser = require('bowser')

// http://caniuse.com/#feat=custom-elementsv1

export default () => {
  if (typeof customElements === 'undefined') return false
  if (bowser.firefox || bowser.msie || bowser.msedge) return false
  if (bowser.ios) return false  // TODO what about ios safari 10.3 or 11?
  if (bowser.check({
    chrome: '58',
    opera: '46',
    vivaldi: '1.92'
  })) return true
  return false // return false if unsure about browser support for customElements
}

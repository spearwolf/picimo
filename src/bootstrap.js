/* global SystemJS BLITPUNK_ENV */
import detectCustomElements from './bootstrap/detectCustomElements.js'
import detectJavascriptVariant from './bootstrap/detectJavascriptVariant.js'

const javascriptVariant = detectJavascriptVariant()
const needsCustomElementsPolyfill = !detectCustomElements()

const log = typeof console !== 'undefined' ? (
  typeof console.debug === 'function'
  ? (...args) => console.debug(...args)
  : (...args) => console.log(...args)
) : () => 1

log(`blitpunk bootstrap (${BLITPUNK_ENV})`, 'javascriptVariant=', javascriptVariant, 'needsCustomElementsPolyfill=', needsCustomElementsPolyfill)

const loadPolyfills = needsCustomElementsPolyfill
  ? SystemJS.import('document-register-element.js').then(() => {
    log('loaded polyfill: customElements')
  })
  : Promise.resolve()

const loadBlitpunk = () => {
  // const variant = javascriptVariant ? 'modern' : 'legacy'
  const jsFile = `blitpunk${BLITPUNK_ENV === 'development' ? '-dev' : ''}-${javascriptVariant}.js`
  log('fetching', jsFile)

  return SystemJS.import(jsFile).then(({ default: blitpunk }) => {
    log('loaded blitpunk', blitpunk)
    return blitpunk
  })
}

export default loadPolyfills.then(loadBlitpunk)

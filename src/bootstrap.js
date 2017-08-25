/* global SystemJS BLITPUNK_ENV */
import detectCustomElements from './bootstrap/detectCustomElements.js'
import detectModernJavascript from './bootstrap/detectModernJavascript.js'

const isModernJavascript = detectModernJavascript()
const needsCustomElementsPolyfill = !detectCustomElements()

const log = typeof console !== 'undefined' ? (
  typeof console.debug === 'function'
  ? (...args) => console.debug(...args)
  : (...args) => console.log(...args)
) : () => 1

log(`blitpunk bootstrap (${BLITPUNK_ENV})`, 'isModernJavascript=', isModernJavascript, 'needsCustomElementsPolyfill=', needsCustomElementsPolyfill)

const loadPolyfills = needsCustomElementsPolyfill
  ? SystemJS.import('document-register-element.js').then(() => {
    log('loaded polyfill: customElements')
  })
  : Promise.resolve()

const loadBlitpunk = () => {
  const variant = isModernJavascript ? 'modern' : 'legacy'
  const jsFile = `blitpunk${BLITPUNK_ENV === 'development' ? '-dev' : ''}-${variant}.js`
  log('fetching', jsFile)

  return SystemJS.import(jsFile).then(({ default: blitpunk }) => {
    log('loaded blitpunk', blitpunk)
    return blitpunk
  })
}

export default loadPolyfills.then(loadBlitpunk)

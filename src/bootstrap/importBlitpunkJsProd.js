
export default (javascriptVariant, log) => {
  let jsImport
  switch (javascriptVariant) {
    case 'modern':
      log('fetching', 'blitpunk-modern.js')
      jsImport = import(
        /* webpackChunkName: "modern" */
        'blitpunk-modern.js'
      )
      break
    case 'safari':
      log('fetching', 'blitpunk-safari.js')
      jsImport = import(
        /* webpackChunkName: "safari" */
        'blitpunk-safari.js'
      )
      break
    default:
      log('fetching', 'blitpunk-legacy.js')
      jsImport = import(
        /* webpackChunkName: "legacy" */
        'blitpunk-legacy.js'
      )
  }
  return jsImport
}

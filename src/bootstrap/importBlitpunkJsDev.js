
export default (javascriptVariant, log) => {
  let jsImport
  switch (javascriptVariant) {
    case 'modern':
      log('fetching variant: modern')
      jsImport = import(
        /* webpackChunkName: "modern" */
        'blitpunk-modern.js'
      )
      break
    case 'safari':
      log('fetching variant: safari')
      jsImport = import(
        /* webpackChunkName: "safari" */
        'blitpunk-safari.js'
      )
      break
    default:
      log('fetching variant: legacy')
      jsImport = import(
        /* webpackChunkName: "legacy" */
        'blitpunk-legacy.js'
      )
  }
  return jsImport
}

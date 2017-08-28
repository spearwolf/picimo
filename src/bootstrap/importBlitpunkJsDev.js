
export default (javascriptVariant, log) => {
  let jsImport
  switch (javascriptVariant) {
    case 'modern':
      log('fetching', 'blitpunk-dev-modern.js')
      jsImport = import(
        /* webpackChunkName: "modern-dev" */
        'blitpunk-dev-modern.js'
      )
      break
    case 'safari':
      log('fetching', 'blitpunk-dev-safari.js')
      jsImport = import(
        /* webpackChunkName: "safari-dev" */
        'blitpunk-dev-safari.js'
      )
      break
    default:
      log('fetching', 'blitpunk-dev-legacy.js')
      jsImport = import(
        /* webpackChunkName: "legacy-dev" */
        'blitpunk-dev-legacy.js'
      )
  }
  return jsImport
}

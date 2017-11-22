
export default (javascriptVariant) => {
  let jsImport
  switch (javascriptVariant) {
    case 'modern':
      jsImport = import(
        /* webpackChunkName: "modern" */
        'blitpunk-modern.js'
      )
      break
    case 'safari':
      jsImport = import(
        /* webpackChunkName: "safari" */
        'blitpunk-safari.js'
      )
      break
    default:
      jsImport = import(
        /* webpackChunkName: "legacy" */
        'blitpunk-legacy.js'
      )
  }
  return jsImport
}

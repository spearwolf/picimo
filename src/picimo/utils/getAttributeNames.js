
/**
 * polyfill for Element#getAttributeNames()
 */
export default domEl => {
  const attrNames = []
  const attrs = domEl.attributes
  for (let i = 0; i < attrs.length; i++) {
    attrNames.push(attrs[i].name)
  }
  return attrNames
}

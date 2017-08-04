
export default function (el, name, defaultValue) {
  const val = el.getAttribute(name)
  if (val) {
    const VAL = val.toUpperCase()
    return VAL === 'true' || VAL === 'on' || VAL === 'yes'
  }
  return el.hasAttribute(name) || defaultValue
}

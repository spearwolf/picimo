
export default function (el, name, defaultValue) {
  if (!el.hasAttribute(name)) return defaultValue
  switch (el.getAttribute(name).toLowerCase()) {
    case 'true':
    case 'yes':
    case 'on':
    case '':
    case name:
      return true
  }
  return false
}

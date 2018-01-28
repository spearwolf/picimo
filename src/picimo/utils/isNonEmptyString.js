
export default function isNonEmptyString (str) {
  return typeof str === 'string' && str.length > 0
}

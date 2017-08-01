const reNumber = /^-?\d+(\.\d+)?$/

// parseValue(str) expects a trimmed string!
//
// special transform rules:
//
//   (string)   => (type)
//   ---------------------
//   '...'      => string: ...
//   "..."      => string: ...
//   123        => number
//   123.456    => number
//   null       => object: null
//   undefined  => undefined
//   true       => boolean: true
//   false      => boolean: false
//
function parseValue (value) {
  const len = value.length
  if (len >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.substr(1, value.length - 2)
  } else if (len >= 2 && value.startsWith('\'') && value.endsWith('\'')) {
    return value.substr(1, value.length - 2)
  } else if (len > 0 && reNumber.exec(value)) {
    return parseFloat(value)
  } else if (value === 'null') {
    return null
  } else if (value === 'undefined') {
    return undefined
  } else if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  }
  return value
}

function parseProperty (map, property) {
  if (property.includes(':')) {
    let [ key, value ] = property.split(':', 2)
    key = key.trim()
    value = value.trim()
    if (key && value) {
      map[key] = parseValue(value)
    }
  }
}

// module.exports = function (data) {
export default function (data) {
  if (typeof data !== 'string') return data

  const str = data.trim()
  if (str.startsWith('{') && str.endsWith('}')) {
    return JSON.parse(str)
  }

  if (str.includes(';') || str.includes(':')) {
    const propsMaps = {}
    const props = str.split(';')
    for (let i = 0; i < props.length; ++i) {
      parseProperty(propsMaps, props[i].trim())
    }
    return propsMaps
  }

  return parseValue(str)
}

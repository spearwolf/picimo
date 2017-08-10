/* eslint-env browser */
const reNumber = /^[-+]?(\d+\.|\.)?\d+(e\d+|e[-+]\d+)?$/
const reUrl = /^url\(\s*([^)]+)\)$/
const reVec2 = /^vec2\(\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*\)$/
const reVec3 = /^vec3\(\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*\)$/
const reVec4 = /^vec4\(\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*\)$/
const reFunc = /^\s*[a-zA-Z]+\(\s*[^)]+\)\s*$/

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
//   {...}      => JSON.parse(...)
//   [...]      => JSON.parse(...)
//   url(...)   => new URL(...)
//   vec2(<number>, <number>) => new Float32Array([number, number])
//   vec3(<number>, <number>, <number>) => new Float32Array([number, number, number])
//   vec4(<number>, <number>, <number>, <number>) => new Float32Array([...])
//
function parseValue (value) {
  const len = value.length
  if (len >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.substr(1, value.length - 2)
  } else if (len >= 2 && value.startsWith('{') && value.endsWith('}')) {
    return JSON.parse(value)
  } else if (len >= 2 && value.startsWith('[') && value.endsWith(']')) {
    return JSON.parse(value)
  } else if (len >= 2 && value.startsWith('\'') && value.endsWith('\'')) {
    return value.substr(1, value.length - 2)
  } else if (len > 0 && reNumber.exec(value)) {
    return parseFloat(value)
  }

  let m = reUrl.exec(value)
  if (m) return new URL(m[1].trim())

  m = reVec2.exec(value)
  if (m) return new Float32Array(m.slice(1, 3).map(parseFloat))

  m = reVec3.exec(value)
  if (m) return new Float32Array(m.slice(1, 4).map(parseFloat))

  m = reVec4.exec(value)
  if (m) return new Float32Array(m.slice(1, 5).map(parseFloat))

  switch (value) {
    case 'null': return null
    case 'undefined': return undefined
    case 'true': return true
    case 'false': return false
    default:
      return value
  }
}

function indexOfNextNonWhitespace (str, curIdx) {
  const len = str.length
  let i = curIdx
  if (i >= len) return len
  do {
    if (str[i] === ' ' || str[i] === '\t') {
      ++i
    } else {
      return i
    }
  } while (i < len)
  return len
}

function indexOfNextSeperator (str, curIdx, seperator = ';') {
  const len = str.length
  let i = curIdx
  let isInside = null
  do {
    if (isInside === null) {
      switch (str[i]) {
        case seperator: return i
        case '\'':
          isInside = '\''
          ++i
          break
        case '"':
          isInside = '"'
          ++i
          break
        case '(':
          isInside = ')'
          ++i
          break
        case '{':
          isInside = '}'
          ++i
          break
        case '\\':
          i += 2
          break
        default:
          ++i
      }
    } else {
      if (str[i] === isInside) {
        isInside = null
        ++i
      } else if (str[i] === '\\') {
        i += 2
      } else {
        ++i
      }
    }
  } while (i < len)
  return len
}

function splitIntoPropTokens (str) {
  if (typeof str !== 'string' || !str) return

  const propTokens = []
  const len = str.length

  let i = indexOfNextNonWhitespace(str, 0)
  do {
    const to = indexOfNextSeperator(str, i, ';')
    if (to > i) {
      propTokens.push(str.slice(i, to))
    }
    i = indexOfNextNonWhitespace(str, to + 1)
  } while (i < len)

  return propTokens
}

function splitIntoProps (str) {
  const tokens = splitIntoPropTokens(str)
  if (!tokens) return
  return tokens.map((tok) => {
    if (reFunc.exec(tok)) {
      return { value: tok.trim() }
    }
    const colon = tok.indexOf(':')
    if (colon === -1) {
      return { value: tok.trim() }
    }
    const key = tok.slice(0, colon).trim()
    const value = tok.substr(colon + 1).trim()
    return {
      key,
      value
    }
  }).filter((prop) => !(prop.key === '' && prop.value === ''))
}

function parseCssStyledProperties (data) {
  if (typeof data !== 'string') return data

  // => json
  const str = data.trim()
  if (str.startsWith('{') && str.endsWith('}')) {
    return JSON.parse(str)
  }

  const props = splitIntoProps(str)

  // => undefined
  if (!props || props.length === 0) return

  if ('key' in props[0]) {
    // => properties
    const map = {}
    props.forEach(({ key, value }) => {
      map[key] = parseValue(value)
    })
    return map
  } else {
    // => array of values OR single value
    const values = props.map(({ value }) => parseValue(value))
    return values.length === 1 ? values[0] : values
  }
}

export default parseCssStyledProperties
export {
  splitIntoPropTokens,
  splitIntoProps,
  indexOfNextNonWhitespace,
  indexOfNextSeperator,
  parseValue
}

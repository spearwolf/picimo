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
//   {...}      => JSON.parse()
//
function parseValue (value) {
  const len = value.length
  if (len >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.substr(1, value.length - 2)
  } else if (len >= 2 && value.startsWith('{') && value.endsWith('}')) {
    return JSON.parse(value)
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

function indexOfNextSeperator (str, curIdx) {
  const len = str.length
  let i = curIdx
  let isInside = null
  do {
    if (isInside === null) {
      switch (str[i]) {
        case ';': return i
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
    const to = indexOfNextSeperator(str, i)
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

// module.exports = parseCssStyledProperties
// module.exports.splitIntoPropTokens = splitIntoPropTokens
// module.exports.splitIntoProps = splitIntoProps
// module.exports.indexOfNextNonWhitespace = indexOfNextNonWhitespace
// module.exports.indexOfNextSeperator = indexOfNextSeperator
export default parseCssStyledProperties
export {
  splitIntoPropTokens,
  splitIntoProps,
  indexOfNextNonWhitespace,
  indexOfNextSeperator
}

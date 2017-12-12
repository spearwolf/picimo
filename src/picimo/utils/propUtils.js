
export const definePublicPropertyRO = (obj, name, value) => {
  Object.defineProperty(obj, name, { value, enumerable: true, configurable: true })
  return obj
}

export const definePublicPropertiesRO = (obj, attrs) => {
  Object.entries(attrs).forEach(([name, value]) => definePublicPropertyRO(obj, name, value))
  return obj
}

export const defineHiddenPropertyRO = (obj, name, value) => {
  Object.defineProperty(obj, name, { value, configurable: true })
  return obj
}

export const defineHiddenPropertiesRO = (obj, attrs) => {
  Object.entries(attrs).forEach(([name, value]) => defineHiddenPropertyRO(obj, name, value))
  return obj
}

export const defineHiddenPropertyRW = (obj, name, value) => {
  Object.defineProperty(obj, name, { value, writable: true, configurable: true })
  return obj
}

export const defineHiddenPropertiesRW = (obj, attrs) => {
  Object.entries(attrs).forEach(([name, value]) => defineHiddenPropertyRW(obj, name, value))
  return obj
}

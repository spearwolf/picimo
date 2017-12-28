
const valueUnitRegex = new RegExp('^([^a-z%]*)([a-zA-Z%]*)$')

export default (value, defaultUnit, defaultValue) => {
  if (!value) return null

  const m = valueUnitRegex.exec(value)
  if (m) {
    return {
      value: (m[1].length > 0 ? parseFloat(m[1]) : defaultValue),
      unit: (m[2] || defaultUnit)
    }
  } else {
    return { value: defaultValue, unit: defaultUnit }
  }
}

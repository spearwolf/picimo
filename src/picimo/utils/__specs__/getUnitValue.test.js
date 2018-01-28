/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import { getUnitValue } from 'picimo/utils'

describe('getUnitValue', () => {
  it('should parse value and unit', () => {
    const { value, unit } = getUnitValue('100.5vw', 'xx')
    expect(value).to.equal(100.5)
    expect(unit).to.equal('vw')
  })

  it('should parse % as unit', () => {
    const { value, unit } = getUnitValue('100.5%', 'xx')
    expect(value).to.equal(100.5)
    expect(unit).to.equal('%')
  })

  it('should return default unit', () => {
    const { value, unit } = getUnitValue('.666', 'xx')
    expect(value).to.equal(0.666)
    expect(unit).to.equal('xx')
  })

  it('should return default value', () => {
    const { value, unit } = getUnitValue('wo', 'xx', 23)
    expect(value).to.equal(23)
    expect(unit).to.equal('wo')
  })

  it('should return undefined as default value', () => {
    const { value, unit } = getUnitValue('wo', 'xx')
    expect(value).to.equal(undefined)
    expect(unit).to.equal('wo')
  })

  it('should return null if value is blank', () => {
    const val = getUnitValue('', 'xx', 23)
    expect(val).to.equal(null)
  })

  it('should return null if value is null', () => {
    const val = getUnitValue(null, 'xx', 23)
    expect(val).to.equal(null)
  })

  it('should return null if value is undefined', () => {
    const val = getUnitValue(undefined, 'xx', 23)
    expect(val).to.equal(null)
  })
})

/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import { AABB2 } from 'picimo/core'

describe('AABB2', () => {
  it('should be instanceable', () => {
    expect(new AABB2()).to.be.ok
  })
  it('minX(5, 3)', () => {
    const aabb2 = new AABB2(5, 3)
    expect(aabb2.minX).to.equal(3)
  })
  it('minX(-4, 9)', () => {
    const aabb2 = new AABB2(-4, 9)
    expect(aabb2.minX).to.equal(-4)
  })
  it('maxX(5, 3)', () => {
    const aabb2 = new AABB2(5, 3)
    expect(aabb2.maxX).to.equal(5)
  })
  it('maxX(-4, 9)', () => {
    const aabb2 = new AABB2(-4, 9)
    expect(aabb2.maxX).to.equal(9)
  })
})

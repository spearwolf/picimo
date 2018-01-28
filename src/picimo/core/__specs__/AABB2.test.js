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
  it('get width', () => {
    const aabb2 = new AABB2(2, 10)
    expect(aabb2.width).to.equal(8)
  })
  it('set width', () => {
    const aabb2 = new AABB2(2, 10)
    aabb2.width = 10
    expect(aabb2.maxX).to.equal(12)
    expect(aabb2.minX).to.equal(2)
  })
  it('height', () => {
    const aabb2 = new AABB2(2, 10, 3, -7)
    expect(aabb2.height).to.equal(10)
  })
  it('set height', () => {
    const aabb2 = new AABB2(2, 10, 3, -7)
    aabb2.height = 15
    expect(aabb2.maxY).to.equal(8)
    expect(aabb2.minY).to.equal(-7)
  })
  it('centerX', () => {
    const aabb2 = new AABB2(2, 10, -7, 3)
    expect(aabb2.centerX).to.equal(6)
  })
  it('centerY', () => {
    const aabb2 = new AABB2(2, 10, -7, 3)
    expect(aabb2.centerY).to.equal(-2)
  })
  describe('addPoint', () => {
    const aabb2 = new AABB2(2, 10, -7, 3)
    it('top', () => {
      aabb2.addPoint(4, 5)
      expect(aabb2.centerY).to.equal(-1)
    })
    it('bottom-left', () => {
      aabb2.addPoint(-2, -9)
      expect(aabb2.centerX).to.equal(4)
      expect(aabb2.centerY).to.equal(-2)
    })
  })
  describe('isInside', () => {
    const aabb2 = new AABB2(2, 10, -7, 3)
    it('inside', () => {
      expect(aabb2.isInside(2, 0)).to.be.true
      expect(aabb2.isInside(2, -7)).to.be.true
    })
    it('outside', () => {
      expect(aabb2.isInside(10, -7)).to.be.false
      expect(aabb2.isInside(2, 3)).to.be.false
    })
  })
  describe('isIntersection', () => {
    const aabb2 = new AABB2(2, 10, -7, 3)
    it('intersect', () => {
      expect(aabb2.isIntersection(new AABB2(0, 4, 0, 4))).to.be.true
    })
    it('no intersection', () => {
      expect(aabb2.isIntersection(new AABB2(0, 2, 0, 4))).to.be.false
    })
  })
})

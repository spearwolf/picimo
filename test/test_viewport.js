/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import { Viewport } from 'picimo/core'

describe('Viewport', () => {
  it('should be instanceable', () => {
    expect(new Viewport()).to.be.ok
  })
  it('width', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.width).to.equal(8)
  })
  it('height', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.height).to.equal(10)
  })
  it('minX', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.minX).to.equal(2)
  })
  it('maxX', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.maxX).to.equal(10)
  })
  it('minY', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.minY).to.equal(-7)
  })
  it('maxY', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.maxY).to.equal(3)
  })
  it('x', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.x).to.equal(2)
  })
  it('y', () => {
    const view = new Viewport(2, -7, 8, 10)
    expect(view.y).to.equal(-7)
  })
  it('set x', () => {
    const view = new Viewport(2, -7, 8, 10)
    view.x = 5
    expect(view.x).to.equal(5)
    expect(view.minX).to.equal(5)
    expect(view.width).to.equal(8)
    expect(view.maxX).to.equal(13)
  })
  it('set y', () => {
    const view = new Viewport(2, -7, 8, 10)
    view.y = 10
    expect(view.y).to.equal(10)
    expect(view.minY).to.equal(10)
    expect(view.height).to.equal(10)
    expect(view.maxY).to.equal(20)
  })
})

/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import { StackedContext } from 'picimo/utils'

describe('StackedContext', () => {
  it('should be instanceable', () => {
    expect(new StackedContext()).to.be.ok
  })
  it('can push and pop values to a named stack', () => {
    const ctx = new StackedContext()
    expect(ctx.get('foo')).to.equal(undefined)
    ctx.push('foo', 123)
    expect(ctx.get('foo')).to.equal(123)
    ctx.push('foo', 456)
    ctx.push('bar', 789)
    expect(ctx.get('foo')).to.equal(456)
    expect(ctx.get('bar')).to.equal(789)
    ctx.pop('foo')
    expect(ctx.get('foo')).to.equal(123)
    ctx.pop('foo')
    expect(ctx.get('foo')).to.equal(undefined)
    ctx.pop('foo')
    expect(ctx.get('foo')).to.equal(undefined)
    expect(ctx.get('bar')).to.equal(789)
  })
  it('clear clears all', () => {
    const ctx = new StackedContext()
    expect(ctx.get('foo')).to.equal(undefined)
    expect(ctx.get('bar')).to.equal(undefined)
    ctx.push('foo', 123)
    ctx.push('foo', 456)
    ctx.push('bar', 789)
    expect(ctx.get('foo')).to.equal(456)
    expect(ctx.get('bar')).to.equal(789)
    ctx.clear()
    expect(ctx.get('foo')).to.equal(undefined)
    expect(ctx.get('bar')).to.equal(undefined)
  })
})

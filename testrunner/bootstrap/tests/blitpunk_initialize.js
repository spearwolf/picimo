/* eslint-env mocha */
import assert from 'assert'

describe('BLITPUNK.initialize()', () => {
  it('is as function', () => {
    assert.equal(typeof global.BLITPUNK.initialize, 'function')
  })
  it('returns a Promise which resolves to the blitpunk api', () => {
    return global.BLITPUNK.initialize().then(blitpunk => {
      assert(blitpunk.core)
    })
  })
  it('after the Promise is revolved the blitpunk api is attached to the global BLITPUNK var', () => {
    return global.BLITPUNK.initialize().then(blitpunk => {
      assert(global.BLITPUNK.core)
      assert.equal(global.BLITPUNK.core, blitpunk.core)
    })
  })
})

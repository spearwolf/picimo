/* eslint-env mocha */
import assert from 'assert'

describe('BLITPUNK.initialize()', () => {
  it('is as function', () => {
    assert.equal(typeof global.BLITPUNK.initialize, 'function')
  })
  it('returns a Promise which resolves to the blitpunk api', () => {
    return global.BLITPUNK.initialize().then(blitpunk => {
      assert(blitpunk.App)
    })
  })
  it('after the Promise is revolved the blitpunk api is attached to the global BLITPUNK var', () => {
    return global.BLITPUNK.initialize().then(blitpunk => {
      assert(global.BLITPUNK.App)
      assert.equal(global.BLITPUNK.App, blitpunk.App)
    })
  })
})

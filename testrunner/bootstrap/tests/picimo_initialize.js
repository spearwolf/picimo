/* eslint-env mocha */
import assert from 'assert'

describe('PICIMO.initialize()', () => {
  it('is as function', () => {
    assert.equal(typeof global.PICIMO.initialize, 'function')
  })
  it('returns a Promise which resolves to the picimo api', () => {
    return global.PICIMO.initialize().then(picimo => {
      assert(picimo.core)
    })
  })
  it('after the Promise is revolved the picimo api is attached to the global PICIMO var', () => {
    return global.PICIMO.initialize().then(picimo => {
      assert(global.PICIMO.core)
      assert.equal(global.PICIMO.core, picimo.core)
    })
  })
})

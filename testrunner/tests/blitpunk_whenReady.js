/* eslint-env mocha */
import assert from 'assert'

describe('blitpunk.whenReady()', () => {
  it('is as function', () => {
    assert.equal(typeof global.blitpunk.whenReady, 'function')
  })
})

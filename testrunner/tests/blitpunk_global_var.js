/* eslint-env mocha */
import assert from 'assert'

describe('blitpunk global var', () => {
  it('exists', () => {
    assert(global.blitpunk)
  })
})

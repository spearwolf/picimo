/* eslint-env mocha */
import assert from 'assert'

describe('BLITPUNK global var', () => {
  it('exists', () => {
    assert(global.BLITPUNK)
  })
})

/* eslint-env mocha */
import assert from 'assert'

describe('PICIMO.queryEntity()', () => {
  const { PICIMO } = global

  it('is as function', () => {
    assert.equal(typeof PICIMO.queryEntity, 'function')
  })
})

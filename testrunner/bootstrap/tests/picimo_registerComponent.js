/* eslint-env mocha */
import assert from 'assert'

describe('PICIMO.registerComponent()', () => {
  const { PICIMO } = global

  it('is as function', () => {
    assert.equal(typeof PICIMO.registerComponent, 'function')
  })
})

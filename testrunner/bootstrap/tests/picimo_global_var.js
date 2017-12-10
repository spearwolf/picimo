/* eslint-env mocha */
import assert from 'assert'

describe('PICIMO global var', () => {
  it('exists', () => {
    assert(global.PICIMO)
  })
})

/* eslint-env mocha */
import assert from 'assert'
import Serial from 'blitpunk/utils/serial'

describe('Serial', () => {
  it('default initial value is 1', () => {
    assert.equal(new Serial().value, 1)
  })

  it('.touch() should increase the value', () => {
    const serial = new Serial()
    const a = serial.value
    serial.touch()
    const b = serial.value
    assert(b > a)
    serial.touch()
    const c = serial.value
    assert(c > b)
  })

  it('initial value can be specified as constructor argument', () => {
    const serial = new Serial(666)
    assert.equal(serial.value, 666)
  })
})

/* eslint-env mocha */
import assert from 'assert'
import ElementIndexArray from 'picimo/core/element_index_array'
import ResourceRef from 'picimo/utils/resource_ref'

describe('ElementIndexArray', () => {
  it('Generate(10x quad indices)', () => {
    const arr = ElementIndexArray.Generate(10, [0, 1, 2, 0, 2, 3], 4)

    assert.equal(arr.length, 60)
    assert.equal(arr.objectCount, 10)
    assert.equal(arr.itemCount, 6)

    assert.ok(arr.array instanceof Uint16Array)
    assert.equal(arr.array.length, 60)
    assert.deepEqual(Array.prototype.slice.call(arr.array, 5, 13), [3, 4, 5, 6, 4, 6, 7, 8])

    assert.ok(arr.resourceRef instanceof ResourceRef)
  })
})

import ResourceRef from '../utils/resource_ref'
import WebGlBuffer from '../render/web_gl_buffer'

export default class ElementIndexArray {
  constructor (objectCount, itemCount = 1) {
    this.resourceRef = new ResourceRef(this, {
      target: WebGlBuffer.ELEMENT_ARRAY_BUFFER,
      usage: 'static'
    })

    this.objectCount = objectCount
    this.itemCount = itemCount
    this.length = objectCount * itemCount

    this.array = new Uint16Array(this.length)

    // needed by WebGlRenderer#syncBuffer
    this.resourceRef.hints.typedArray = this.array
  }

  /**
   * @param {number} objectCount
   * @param {number[]} indices
   * @param {number} [stride=4]
   * @param {number} [objectOffset=0]
   * @return {ElementIndexArray}
   * @example
   * // Create a ElementIndexArray for 10 quads where each quad made up of 2x triangles (4x vertices and 6x indices)
   * const quadIndices = ElementIndexArray.Generate(10, [0, 1, 2, 0, 2, 3], 4)
   * quadIndices.length        // => 60
   * quadIndices.itemCount     // => 6
   */
  static Generate (objectCount, indices, stride = 4, objectOffset = 0) {
    const arr = new ElementIndexArray(objectCount, indices.length)

    for (let i = 0; i < objectCount; ++i) {
      for (let j = 0; j < indices.length; ++j) {
        arr.array[(i * arr.itemCount) + j] = indices[j] + ((i + objectOffset) * stride)
      }
    }

    return arr
  }
}

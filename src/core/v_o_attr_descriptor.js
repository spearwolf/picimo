import { BYTES_PER_ELEMENT, TYPED_ARRAY_GETTER } from '../utils/typed_array_helpers'

/**
 * Vertex object *attribute* descriptor.
 */
export default class VOAttrDescriptor {
  /**
   * @param {string} name
   * @param {string} type
   * @param {number} size
   * @param {number} [offset] - either `offset` or `byteOffset` must be specified
   * @param {number} [byteOffset] - either `offset` or `byteOffset` must be specified
   * @param {boolean} uniform
   * @param {string[]} [attrNames]
   */
  constructor (name, type, size, offset, byteOffset, uniform, attrNames) {
    this.name = name
    this.type = type
    this.size = size
    this.uniform = uniform
    this.attrNames = attrNames

    this.bytesPerElement = BYTES_PER_ELEMENT[ this.type ]
    this.bytesPerVertex = this.bytesPerElement * size

    if (typeof byteOffset !== 'number') {
      this.byteOffset = offset * this.bytesPerElement
    } else {
      this.byteOffset = byteOffset
    }

    if (typeof offset !== 'number') {
      this.offset = byteOffset / this.bytesPerElement
    } else {
      this.offset = offset
    }
  }

  /**
   * Number of attributes per vertex
   * @type {number}
   */
  vertexAttrCount (descriptor) {
    return descriptor.bytesPerVertex / this.bytesPerElement
  }

  /**
   * @private
   */
  static defineProperties (attrDesc, propertiesObject, descriptor) {
    const { name } = attrDesc
    const getArray = TYPED_ARRAY_GETTER[attrDesc.type]
    const vertexCount = descriptor.vertexCount
    const vertexAttrCount = attrDesc.vertexAttrCount(descriptor)
    const offset = attrDesc.byteOffset / attrDesc.bytesPerElement

    let i, j

    if (attrDesc.size === 1) {
      if (attrDesc.uniform) {
        const valueGetter = getV1u(getArray, offset)

        attrDesc.getValue = function (vo) {
          return valueGetter.call(vo)
        }

        propertiesObject[ name ] = {

          get: valueGetter,
          set: setV1u(getArray, vertexCount, vertexAttrCount, offset),
          enumerable: true

        }
      } else {
        propertiesObject[ 'set' + camelize(name) ] = {

          value: setVNv(getArray, 1, vertexCount, vertexAttrCount, offset),
          enumerable: true

        }

        const valueGetters = []

        for (i = 0; i < descriptor.vertexCount; ++i) {
          const curValueGetter = getV1u(getArray, offset + (i * vertexAttrCount))

          valueGetters.push(curValueGetter)

          propertiesObject[ name + i ] = {

            get: curValueGetter,
            set: setVNv(getArray, 1, 1, 0, offset + (i * vertexAttrCount)),
            enumerable: true

          }
        }

        attrDesc.getValue = function (vo, vi) {
          return valueGetters[vi].call(vo)
        }
      }
    } else if (attrDesc.size >= 2) {
      if (attrDesc.uniform) {
        const valueGetter = getVNu(getArray, offset)

        attrDesc.getValue = function (vo, vi, idx) {
          return valueGetter.call(vo, idx)
        }

        propertiesObject[ 'get' + camelize(name) ] = {

          value: valueGetter,
          enumerable: true

        }

        propertiesObject[ 'set' + camelize(name) ] = {

          value: setVNu(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset),
          enumerable: true

        }

        for (i = 0; i < attrDesc.size; ++i) {
          const setterName = attrPostfix(attrDesc, name, i)

          propertiesObject[ setterName ] = {

            get: getV1u(getArray, offset + i),
            set: setV1u(getArray, vertexCount, vertexAttrCount, offset + i),
            enumerable: true

          }
        }
      } else {
        propertiesObject[ 'set' + camelize(name) ] = {

          value: setVNv(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset),
          enumerable: true

        }

        const valueGetters = []

        for (i = 0; i < descriptor.vertexCount; ++i) {
          const curVertexValueGetters = []

          for (j = 0; j < attrDesc.size; ++j) {
            const setterName = attrPostfix(attrDesc, name, j) + i
            const curValueGetter = getV1u(getArray, offset + (i * vertexAttrCount) + j)

            curVertexValueGetters.push(curValueGetter)

            propertiesObject[ setterName ] = {

              get: curValueGetter,
              set: setVNv(getArray, 1, 1, 0, offset + (i * vertexAttrCount) + j),
              enumerable: true

            }
          }

          valueGetters.push(curVertexValueGetters)
        }

        attrDesc.getValue = function (vo, vi, idx) {
          return valueGetters[vi][idx].call(vo)
        }
      }
    }
  }
}

/** @private */
function attrPostfix (attrDesc, name, index) {
  if (attrDesc.attrNames) {
    let postfix = attrDesc.attrNames[ index ]

    if (postfix !== undefined) {
      return postfix
    }
  }

  return name + '_' + index
}

/** @private */
function getVNu (getArray, offset) {
  return function (attrIndex) {
    return getArray(this.voArray)[ offset + attrIndex ]
  }
}

/** @private */
function setVNu (getArray, vectorLength, vertexCount, vertexAttrCount, offset) {
  return function () {
    const _array = getArray(this.voArray)
    let i
    let n

    for (i = 0; i < vertexCount; ++i) {
      for (n = 0; n < vectorLength; ++n) {
        _array[ (i * vertexAttrCount) + offset + n ] = arguments[n]
      }
    }
  }
}

/** @private */
function getV1u (getArray, offset) {
  return function () {
    return getArray(this.voArray)[ offset ]
  }
}

/** @private */
function setVNv (getArray, vectorLength, vertexCount, vertexAttrCount, offset) {
  return function () {
    const _array = getArray(this.voArray)
    let i
    let n

    for (i = 0; i < vertexCount; ++i) {
      for (n = 0; n < vectorLength; ++n) {
        _array[(i * vertexAttrCount) + offset + n] = arguments[(i * vectorLength) + n]
      }
    }
  }
}

/** @private */
function setV1u (getArray, vertexCount, vertexAttrCount, offset) {
  return function (value) {
    const _array = getArray(this.voArray)

    for (let i = 0; i < vertexCount; ++i) {
      _array[ (i * vertexAttrCount) + offset ] = value
    }
  }
}

/** @private */
function camelize (name) {
  return name[ 0 ].toUpperCase() + name.substr(1)
}

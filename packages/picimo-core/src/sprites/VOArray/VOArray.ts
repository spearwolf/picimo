import { createBufferView } from './createBufferView';
import { createLinkedTypedArrays, ArrayDataType } from './createLinkedTypedArrays';

type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;

export interface VOArrayUsageHints {

  dynamic: boolean;

  autotouch: boolean;

}

export interface VOArrayUsageOptions {

  dynamic?: boolean;

  autotouch?: boolean;

}

/**
 * A wrapper for an ArrayBuffer which additional holds multiple references to typed arrays.
 */
export class VOArray {

  capacity: number;

  bytesPerVO: number;

  arrayDataTypes: ArrayDataType[];

  buffer: ArrayBuffer;
  bufferByteOffset: number;
  bufferByteLength: number;

  serial: number = 1;

  hints: VOArrayUsageHints;

  float32Array: Float32Array = null;
  int16Array: Int16Array = null;
  int32Array: Int32Array = null;
  int8Array: Int8Array = null;
  uint16Array: Uint16Array = null;
  uint32Array: Uint32Array = null;
  uint8Array: Uint8Array = null;

  /**
   * Represents an array buffer for vertex objects.
   *
   * For each *array type* a property is created:
   *
   * _arrayType_:`float32` &rarr; _property_:`float32Array` &rarr; _type_:`Float32Array`
   *
   * Supported _array types_ are: `float32`, `int32`, `int16`, `int8`, `uint32`, `uint16`, `uint8`
   *
   * If `data` is defined, no new buffer is created but a *view* into the buffer passed is generated.
   *
   * @param capacity - Number of `vertex objects`
   * @param bytesPerVO - Size of a single `vertex object` in *bytes*. **Must be divisible by 4**.
   * @param arrayDataTypes - List of allowed *typed array types*. Should have at least one type included.
   * @param data - Create a *view* into the buffer from `data`
   * @param hints - Optional array buffer usage *hints*
   */
  constructor(
    capacity: number,
    bytesPerVO: number,
    arrayDataTypes: ArrayDataType[],
    data?: ArrayBuffer | DataView | TypedArray,
    hints?: VOArrayUsageOptions,
  ) {

    if (bytesPerVO % 4 !== 0) {
      throw new TypeError(`new VOArray: bytesPerVO must be divisible by 4 (but is not!) bytesPerVO=${bytesPerVO}`);
    }

    this.capacity = capacity;
    this.bytesPerVO = bytesPerVO;
    this.arrayDataTypes = arrayDataTypes.slice(0);

    let buffer: ArrayBuffer;
    let bufferByteOffset: number;
    let bufferByteLength: number;

    if (data) {

      const bufferView = createBufferView(capacity, bytesPerVO, data);

      buffer = bufferView.buffer;
      bufferByteOffset = bufferView.byteOffset;
      bufferByteLength = bufferView.byteLength;

    } else {

      buffer = new ArrayBuffer(capacity * bytesPerVO);

      bufferByteOffset = 0;
      bufferByteLength = buffer.byteLength;

    }

    this.buffer = buffer;
    this.bufferByteOffset = bufferByteOffset;
    this.bufferByteLength = bufferByteLength;

    Object.assign(this, {

      float32Array: null,
      int16Array: null,
      int32Array: null,
      int8Array: null,
      uint16Array: null,
      uint32Array: null,
      uint8Array: null,

    }, createLinkedTypedArrays(

      this.buffer,
      this.bufferByteOffset,
      this.bufferByteLength,

      arrayDataTypes,

    ));

    this.hints = Object.assign({
      dynamic: false,
      autotouch: false,
    }, hints);

  }

  getTypedArray(type: ArrayDataType) {
    switch (type) {
      case 'float32': return this.float32Array;
      case 'int16': return this.int16Array;
      case 'int32': return this.int32Array;
      case 'int8': return this.int8Array;
      case 'uint16': return this.uint16Array;
      case 'uint32': return this.uint32Array;
      case 'uint8': return this.uint8Array;
    }
  }

  /**
   * Copy all `vertex objects` from *source* to the internal *buffer* (destination).
   * Both *arrays* should have the same `bytesPerVO` value.
   *
   * @param from - Source *array*.
   * @param toOffset - `vertex object` destination offset
   */
  copy(from: VOArray, toOffset: number = 0) {

    const elementsPerVO = this.bytesPerVO / Uint32Array.BYTES_PER_ELEMENT;
    const offset = toOffset > 0 ? toOffset * elementsPerVO : 0;

    this.toUint32Array().set(from.toUint32Array(), offset);

  }

  /**
   * Returns the array buffer converted to an `Uint32Array`.
   * As a side-effect the `uint32Array` property will be created (if it did not exist before).
   */
  toUint32Array() {

    const { uint32Array } = this;

    if (!uint32Array) {

      const elementsPerVO = this.bytesPerVO / Uint32Array.BYTES_PER_ELEMENT;

      this.uint32Array = new Uint32Array(this.buffer, this.bufferByteOffset, this.capacity * elementsPerVO);

      return this.uint32Array;

    }

    return uint32Array;

  }

  /**
   * Create a VOArray *subarray*.
   *
   * A *subarray* is a *view* to the same underlying buffer. No data will be copied.
   *
   * @param begin - Index of first `vertex object`
   * @param size - Number of `vertex objects` to copy
   */
  subarray(begin: number, size: number = 1) {

    const { bytesPerVO, bufferByteOffset } = this;
    const byteBegin = bufferByteOffset + (begin * bytesPerVO);
    const byteLength = size * bytesPerVO;

    return new VOArray(size, bytesPerVO, this.arrayDataTypes, new DataView(this.buffer, byteBegin, byteLength));

  }

}

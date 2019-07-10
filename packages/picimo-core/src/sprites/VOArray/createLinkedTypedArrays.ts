
export type ArrayDataType = "float32" | "int32" | "int16" | "int8" | "uint32" | "uint16" | "uint8";

type TypedArrayAccessor =  "float32Array" | "int16Array" | "int32Array" | "int8Array" | "uint16Array" | "uint32Array" | "uint8Array";

const typedArrayProp = (type: ArrayDataType) => `${type}Array` as TypedArrayAccessor;

export interface TypedArrays {
  float32Array?: Float32Array;
  int16Array?: Int16Array;
  int32Array?: Int32Array;
  int8Array?: Int8Array;
  uint16Array?: Uint16Array;
  uint32Array?: Uint32Array;
  uint8Array?: Uint8Array;
}

const TYPED_ARRAY = {
  float32: Float32Array,
  int16: Int16Array,
  int32: Int32Array,
  int8: Int8Array,
  uint16: Uint16Array,
  uint32: Uint32Array,
  uint8: Uint8Array,
};

export const createLinkedTypedArrays = (buffer: ArrayBuffer, bufferByteOffset: number, bufferByteLength: number, arrayTypes: ArrayDataType[]) => {

  const typedArrays: TypedArrays = {};

  arrayTypes.forEach((type) => {
    const TypedArray = TYPED_ARRAY[type];
    const arr = new TypedArray(buffer, bufferByteOffset, bufferByteLength / TypedArray.BYTES_PER_ELEMENT);
    typedArrays[typedArrayProp(type)] = arr as any;
  });

  return typedArrays;

};

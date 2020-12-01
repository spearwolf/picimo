export const createBufferView = (
  capacity: number,
  bytesPerVO: number,
  data: ArrayBufferLike | ArrayBufferView,
): DataView => {
  const byteLength = capacity * bytesPerVO;

  if (ArrayBuffer.isView(data)) {
    const {byteOffset, byteLength: dataByteLength} = data;
    if (byteLength > dataByteLength) {
      throw new TypeError(
        `VOArray: [data] buffer is too small! needs ${byteLength} bytes (capacity=${capacity} bytesPerVO=${bytesPerVO}) but has ${dataByteLength} (byteOffset=${byteOffset}) bytes!`,
      );
    }
    return new DataView(data.buffer, byteOffset, byteLength);
  }

  if (data?.byteLength) {
    if (byteLength > data.byteLength) {
      throw new TypeError(
        `VOArray: [data] buffer is too small! needs ${byteLength} bytes (capacity=${capacity} bytesPerVO=${bytesPerVO}) but has ${data.byteLength} bytes!`,
      );
    }
    return new DataView(data, 0, byteLength);
  }

  throw new TypeError(
    'VOArray: [data] must be instanceof ArrayBuffer, DataView or TypedArray!',
  );
};

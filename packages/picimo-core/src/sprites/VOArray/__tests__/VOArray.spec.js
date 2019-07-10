/* eslint-env jest */
import assert from 'assert';

import { VOArray } from '..';

describe('VOArray', () => {
  it('create instance', () => {
    const voa = new VOArray(4, 16, ['float32', 'int16', 'uint8']);

    assert.strictEqual(voa.bufferByteLength, 64);
    assert.strictEqual(voa.buffer, voa.float32Array.buffer);
    assert.strictEqual(voa.buffer, voa.int16Array.buffer);
    assert.strictEqual(voa.buffer, voa.uint8Array.buffer);
    assert.equal(voa.int32Array, undefined);
    assert.equal(voa.int8Array, undefined);
    // assert.equal(voa.uint32Array, undefined); <- may be created by .toUint32Array()
    assert.equal(voa.uint16Array, undefined);
    assert.strictEqual(voa.serial, 1, `serial should be initialized with 1, but is ${voa.serial}`);
  });

  it('should have hints', () => {
    const voa = new VOArray(4, 16, ['float32'], null, { dynamic: false });

    assert.strictEqual(voa.hints.dynamic, false);
  });

  it('create instance should clone arrayTypes (no copy)', () => {
    const arrayDataTypes = ['float32', 'int16', 'uint8'];
    const voa = new VOArray(4, 16, arrayDataTypes);

    assert.notStrictEqual(voa.arrayDataTypes, arrayDataTypes);
    assert.deepEqual(voa.arrayDataTypes, arrayDataTypes);
  });

  it('create from existing buffer should create a view into existing buffer', () => {
    const values = Uint32Array.from([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    ]);

    const voa = new VOArray(2, 16 * Uint32Array.BYTES_PER_ELEMENT, ['uint32'], values);

    assert.strictEqual(voa.bufferByteLength, 128);
    assert.strictEqual(voa.buffer, values.buffer);
    assert.deepEqual(Array.from(voa.uint32Array), Array.from(values));
  });

  it('subarray() should create a new VOArray using the same internal buffer', () => {
    const values = Uint32Array.from([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    ]);

    const a = new VOArray(3, 16 * Uint32Array.BYTES_PER_ELEMENT, ['uint32'], values);
    const b = a.subarray(1, 1);

    assert.strictEqual(values.buffer.byteLength, 3 * 16 * Uint32Array.BYTES_PER_ELEMENT);
    assert.strictEqual(b.bufferByteLength, 16 * Uint32Array.BYTES_PER_ELEMENT);
    assert.strictEqual(b.buffer, a.buffer);

    a.uint32Array[17] = 666;

    assert.deepEqual(Array.from(b.uint32Array), [
      17, 666, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    ]);
  });

  it('copy() without offset', () => {
    const data = new Float32Array(3 * 16);
    data.set([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    ]);

    const a = new VOArray(3, 16 * Float32Array.BYTES_PER_ELEMENT, ['float32'], data.buffer);
    const b = new VOArray(4, 16 * Float32Array.BYTES_PER_ELEMENT, ['float32']);

    b.copy(a, 0);

    assert.deepEqual(Array.from(b.float32Array), [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });

  it('copy() with offset', () => {
    const floats = Uint32Array.from([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    ]);

    const a = new VOArray(3, 16 * Uint32Array.BYTES_PER_ELEMENT, ['uint32'], floats);
    const b = new VOArray(4, 16 * Uint32Array.BYTES_PER_ELEMENT, ['uint8', 'float32', 'uint32']);

    b.copy(a, 1);

    assert.deepEqual(Array.from(b.uint32Array), [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    ]);
  });

  it('toUint32Array() should create the uint32Array property', () => {
    const values = Uint16Array.from([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    ]);
    const voa = new VOArray(2, 16 * Uint16Array.BYTES_PER_ELEMENT, ['uint16'], values);
    const arr = voa.toUint32Array();

    assert.equal(arr instanceof Uint32Array, true, 'toUint32Array() should return an instance of Uint32Array');
    assert.ok(voa.uint32Array, 'uint32Array should be defined now');
    assert.strictEqual(voa.toUint32Array(), arr, 'a subsequent call to toUint32Array() should return the cached instance');
  });
});

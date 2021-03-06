/* eslint-env jest */
import assert from 'assert';

import {VODescriptor, VOPool} from '..';

describe('VOPool', () => {
  const descriptor = new VODescriptor({
    // vertex elements layout
    // ----------------------
    //
    // v0: (x0)(y0)(z0)(r0)(g0)(b0)(a)
    // v1: (x1)(y1)(z1)(r0)(g1)(b1)(a)
    // v2: (x2)(y2)(z2)(r0)(g2)(b2)(a)
    //
    vertexCount: 3,

    attributes: [
      {
        name: 'position',
        type: 'float32',
        size: 3,
        scalars: ['x', 'y', 'z'],
      },
      {
        name: 'color',
        type: 'uint8',
        size: 4,
        scalars: ['r', 'g', 'b', 'a'],
      },
    ],
  });

  it('descriptor', () => {
    assert.equal(descriptor.vertexCount, 3);
    assert.equal(descriptor.vertexAttrCount, 7);
    assert.equal(descriptor.bytesPerVertex, 16);
    assert.equal(descriptor.rightPadBytesPerVertex, 0);
    assert.equal(descriptor.bytesPerVO, 48);
    assert.deepEqual(descriptor.typeList, ['float32', 'uint8'].sort());
    assert.deepEqual(descriptor.scalars, ['position', 'color']);
    assert.deepEqual(
      descriptor.attrList.map((attr) => attr.name),
      ['position', 'color'],
    );
  });

  describe('new VOPool()', () => {
    const zero = descriptor.createVO();
    // @ts-ignore
    zero.setPosition(666, 667, 668, 669, 670, 671, 672, 673, 674);

    const pool = new VOPool(descriptor, {capacity: 8, voZero: zero});
    const floats = new Float32Array(pool.voArray.buffer);
    const vo = [];

    it('should have an .id property', () => {
      assert.strictEqual(typeof pool.id, 'string', 'id should be a string');
      assert.ok(pool.id.length > 0, 'id should not be blank');
    });

    it('default buffer usage should be :dynamic', () => {
      assert.strictEqual(pool.voArray.hints.dynamic, true);
    });

    it('1. alloc()', () => {
      vo.push(pool.alloc());
      vo[0].setPosition(1, 2, 3, 10, 20, 30, 100, 200, 300);

      assert.equal(floats[0], 1);
      assert.equal(floats[1], 2);
      assert.equal(floats[2], 3);

      assert.deepEqual(vo[0].toArray(['position']), [
        1,
        2,
        3,
        10,
        20,
        30,
        100,
        200,
        300,
      ]);

      assert(vo[0].voArray.float32Array, '.voArray.float32Array is undefined!');
      assert(vo[0].voArray.uint8Array, '.voArray.uint8Array is undefined!');

      assert.deepEqual(vo[0].toArray(), [
        1,
        2,
        3,
        0,
        0,
        0,
        0,
        10,
        20,
        30,
        0,
        0,
        0,
        0,
        100,
        200,
        300,
        0,
        0,
        0,
        0,
      ]);
    });

    it('2. alloc()', () => {
      const OFFSET = 12;
      vo.push(pool.alloc());
      vo[1].setPosition(4, 5, 6, 40, 50, 60, 400, 500, 600);

      assert.equal(floats[OFFSET], 4);
      assert.equal(floats[OFFSET + 1], 5);
      assert.equal(floats[OFFSET + 2], 6);

      assert.deepEqual(vo[1].toArray(), [
        4,
        5,
        6,
        0,
        0,
        0,
        0,
        40,
        50,
        60,
        0,
        0,
        0,
        0,
        400,
        500,
        600,
        0,
        0,
        0,
        0,
      ]);
    });

    it('3. alloc()', () => {
      const OFFSET = 24;
      vo.push(pool.alloc());
      vo[2].setPosition(7, 8, 9, 70, 80, 90, 700, 800, 900);

      assert.equal(floats[OFFSET], 7);
      assert.equal(floats[OFFSET + 1], 8);
      assert.equal(floats[OFFSET + 2], 9);

      assert.deepEqual(vo[2].toArray(), [
        7,
        8,
        9,
        0,
        0,
        0,
        0,
        70,
        80,
        90,
        0,
        0,
        0,
        0,
        700,
        800,
        900,
        0,
        0,
        0,
        0,
      ]);
    });

    it('usedCount', () => assert.equal(pool.usedCount, 3));
    it('availableCount', () => assert.equal(pool.availableCount, 5));

    it('free()', () => {
      vo[1].free();

      assert.equal(pool.usedCount, 2);
      assert.equal(pool.availableCount, 6);

      let OFFSET = 12;
      assert.equal(floats[OFFSET], 7);
      assert.equal(floats[OFFSET + 1], 8);
      assert.equal(floats[OFFSET + 2], 9);
      assert.equal(floats[OFFSET + 4], 70);
      assert.equal(floats[OFFSET + 5], 80);
      assert.equal(floats[OFFSET + 6], 90);

      OFFSET += 12;
      assert.equal(floats[OFFSET], 666);
      assert.equal(floats[OFFSET + 1], 667);
      assert.equal(floats[OFFSET + 2], 668);
      assert.equal(floats[OFFSET + 4], 669);
      assert.equal(floats[OFFSET + 5], 670);
      assert.equal(floats[OFFSET + 6], 671);
    });
  });

  describe('new VOPool(max)', () => {
    const pool = new VOPool(descriptor, {maxAllocVOSize: 10});
    const MAX = Math.floor(65536 / 3);

    it('availableCount:before', () => assert.equal(pool.availableCount, MAX));
    it('allocatedCount:before', () => assert.equal(pool.allocatedCount, 10));

    let vOs;

    it('allocate 15x', () => {
      vOs = pool.multiAlloc(15);
      assert.equal(vOs.length, 15);
    });

    it('allocatedCount:after', () => assert.equal(pool.allocatedCount, 20));
    it('availableCoun:after', () =>
      assert.equal(pool.availableCount, MAX - 15));
    it('usedCount:after', () => assert.equal(pool.usedCount, 15));

    it('free all at once', () => {
      pool.free(vOs.slice(0, 13));
      assert.equal(pool.usedCount, 2);
    });
  });

  describe('new VOPool(capacity, maxAllocVOSize: undef)', () => {
    const pool = new VOPool(descriptor, {capacity: 1904});

    it('availableCount', () => assert.equal(pool.availableCount, 1904));
    it('allocatedCount', () => assert.equal(pool.allocatedCount, 1904));
  });

  describe('new VOPool(capacity, maxAllocVOSize: 0)', () => {
    const pool = new VOPool(descriptor, {capacity: 666, maxAllocVOSize: 0});

    it('availableCount', () => assert.equal(pool.availableCount, 666));
    it('allocatedCount', () => assert.equal(pool.allocatedCount, 666));
  });

  describe('new VOPool() : multiAlloc > maxAllocVOSize', () => {
    const pool = new VOPool(descriptor, {capacity: 200, maxAllocVOSize: 10});

    it('availableCount:before', () => assert.equal(pool.availableCount, 200));
    it('allocatedCount:before', () => assert.equal(pool.allocatedCount, 10));

    let vOs;

    it('allocate 25x', () => {
      vOs = pool.multiAlloc(25);
      assert.equal(vOs.length, 25);
    });

    it('allocatedCount:after', () => assert.equal(pool.allocatedCount, 25));
    it('availableCoun:after', () => assert.equal(pool.availableCount, 175));
    it('usedCount:after', () => assert.equal(pool.usedCount, 25));
  });
});

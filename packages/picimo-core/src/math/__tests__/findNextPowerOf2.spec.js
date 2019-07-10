/* eslint-env mocha */
import assert from 'assert';

import { findNextPowerOf2 } from '..';

describe('findNextPowerOf2', () => {
  it('should work', () => {
    assert.strictEqual(findNextPowerOf2(0), 1);
    assert.strictEqual(findNextPowerOf2(1), 1);
    assert.strictEqual(findNextPowerOf2(2), 2);
    assert.strictEqual(findNextPowerOf2(3), 4);
    assert.strictEqual(findNextPowerOf2(9), 16);
    assert.strictEqual(findNextPowerOf2(666), 1024);
    assert.strictEqual(findNextPowerOf2(4096), 4096);
  });
});

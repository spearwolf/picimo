/* eslint-env mocha */
import assert from 'assert';

import { isPowerOf2 } from '..';

describe('isPowerOf2', () => {
  it('power of 2 value', () => {
    assert.strictEqual(isPowerOf2(1), true);
    assert.strictEqual(isPowerOf2(2), true);
    assert.strictEqual(isPowerOf2(4), true);
    assert.strictEqual(isPowerOf2(512), true);
    assert.strictEqual(isPowerOf2(4096), true);
  });
  it('not power of 2 value', () => {
    assert.strictEqual(isPowerOf2(0), false);
    assert.strictEqual(isPowerOf2(63), false);
    assert.strictEqual(isPowerOf2(11), false);
    assert.strictEqual(isPowerOf2(2047), false);
  });
});

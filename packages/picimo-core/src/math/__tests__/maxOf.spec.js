/* eslint-env mocha */
import assert from 'assert';

import { maxOf } from '..';

describe('maxOf', () => {
  it('should work', () => {
    assert.strictEqual(maxOf(0, 0), 0);
    assert.strictEqual(maxOf(-1, -1), -1);
    assert.strictEqual(maxOf(-3, 9), 9);
    assert.strictEqual(maxOf(9, -3), 9);
  });
});

/* eslint-env mocha */
import assert from 'assert';

import { pick } from '../pick';

describe('pick', () => {
  it('should work', () => {
    const result = pick(['foo', 'plah'])({ foo: 123, bar: 456, plah: undefined });
    assert.deepEqual(result, {
      foo: 123,
    });
  });

  it('should return null when the given object is null', () => {
    const result = pick(['foo', 'plah'])();
    assert.ok(result === null);
    assert.strictEqual(typeof result, 'object');
  });
});

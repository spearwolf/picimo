/* eslint-env mocha */
import assert from 'assert';

import { unpick } from '../unpick';

describe('unpick', () => {
  it('should work', () => {
    const result = unpick(['bar'])({ foo: 123, bar: 456, plah: undefined });
    assert.deepEqual(result, {
      foo: 123,
    });
  });

  it('should return null when the given object is null', () => {
    const result = unpick(['foo', 'plah'])();
    assert.ok(result === null);
    assert.strictEqual(typeof result, 'object');
  });
});

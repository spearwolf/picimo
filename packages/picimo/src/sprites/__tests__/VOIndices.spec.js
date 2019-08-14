/* eslint-env mocha */
import assert from 'assert';

import { VOIndices } from '..';

describe('VOIndices', () => {
  it('build(10x quad indices)', () => {
    const indices = VOIndices.build(10, [0, 1, 2, 0, 2, 3], 4);

    assert.equal(indices.length, 60);
    assert.equal(indices.objectCount, 10);
    assert.equal(indices.itemCount, 6);

    assert.ok(Array.isArray(indices.indices));
    assert.equal(indices.indices.length, 60);
    assert.deepEqual(Array.prototype.slice.call(indices.indices, 5, 13), [3, 4, 5, 6, 4, 6, 7, 8]);
  });
});

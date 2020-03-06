/* eslint-env mocha */
import assert from 'assert';

import {Vector2Proxy} from '../Vector2Proxy';

import {Vector3, Vector2} from 'three';

describe('Vector2Proxy', () => {
  it('read values', () => {
    const v = new Vector3(1, 2, 3);
    const vProxy = new Vector2Proxy(v, 'x', 'z');

    assert.strictEqual(v.x, vProxy.x);
    assert.strictEqual(v.z, vProxy.y);
  });

  it('write values', () => {
    const v = new Vector3(1, 2, 3);
    const vProxy = new Vector2Proxy(v, 'y', 'x');

    assert.strictEqual(vProxy.x, 2);
    assert.strictEqual(vProxy.y, 1);

    vProxy.add(new Vector2(5, 7));

    assert.strictEqual(vProxy.x, 7);
    assert.strictEqual(vProxy.y, 8);

    assert.strictEqual(v.x, 8);
    assert.strictEqual(v.y, 7);
    assert.strictEqual(v.z, 3);
  });
});

/* eslint-env mocha */
import assert from 'assert';

import { get } from '..';

describe('get', () => {
  it('undefined', () => {
    assert.strictEqual(get(undefined, 'bar.plah'), undefined);
  });
  it('null', () => {
    assert.strictEqual(get(null, 'foo'), undefined);
  });
  it('foo', () => {
    assert.strictEqual(get({ foo: 666 }, 'foo'), 666);
    assert.strictEqual(get({ foo: 666 }, 'bar'), undefined);
  });
  it('foo[2]', () => {
    assert.strictEqual(get({ foo: [23, 42, 666] }, 'foo[2]'), 666);
    assert.strictEqual(get({ foo: [23, 42, 666], 'foo[2]': 9 }, 'foo[2]'), 9);
  });
  it('foo.bar.plah', () => {
    assert.strictEqual(get({ foo: { bar: { plah: 666 } } }, 'foo.bar.plah'), 666);
    assert.strictEqual(get({ foo: { bar: { plah: 666 } } }, 'foo.plah'), undefined);
  });
  it('"foo.bar.plah"', () => {
    assert.strictEqual(get({ foo: { bar: { plah: 666 } }, 'foo.bar.plah': 23 }, 'foo.bar.plah'), 23);
  });
  it('foo.bar[1].plah', () => {
    assert.strictEqual(get({ foo: { bar: ['abc', { plah: 666 }, 'xyz'] } }, 'foo.bar[1].plah'), 666);
    assert.strictEqual(get({ foo: { bar: ['abc', { plah: 666 }, 'xyz'] } }, 'foo.bar[3].plah'), undefined);
  });
});

/* eslint-env mocha */
import assert from 'assert';

import { TiledMapCustomProperties } from '../TiledMapCustomProperties';

describe('TiledMapCustomProperties', () => {

  const props = new TiledMapCustomProperties([
    { name: 'foo', value: 'abc, def,ghi' },
    { name: 'bar', value: `"x\\" x", 'y', "ghi, klo"` },
    { name: 'plah', value: `    abc    , def,ghi  ,   jkl   ` },
    { name: 'zero', value: `  " "  ` },
  ]);

  it('foo', () => assert.deepStrictEqual(props.valueAsCSLofStrings('foo'), [
    'abc', 'def', 'ghi'
  ]));

  it('bar', () => assert.deepStrictEqual(props.valueAsCSLofStrings('bar'), [
    `x" x`, `y`, `ghi, klo`
  ]));

  it('plah', () => assert.deepStrictEqual(props.valueAsCSLofStrings('plah'), [
    'abc', 'def', 'ghi', 'jkl'
  ]));

  it('zero', () => assert.strictEqual(props.valueAsCSLofStrings('zero'), undefined));

});

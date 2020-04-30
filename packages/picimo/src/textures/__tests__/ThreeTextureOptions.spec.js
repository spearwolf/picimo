/* eslint-env browser */
/* eslint-env mocha */
import assert from 'assert';

import {NearestFilter, LinearFilter} from 'three';

import {ThreeTextureOptions} from '../ThreeTextureOptions';

describe('TextureThreeOptions', () => {
  describe('toString()', () => {
    it('default options', () => {
      assert.equal(new ThreeTextureOptions().toString(), '{}');
    });
    it('partial options', () => {
      assert.equal(
        new ThreeTextureOptions({
          filter: NearestFilter,
          flipy: true,
        }).toString(),
        '{"filter":1003,"flipy":true}',
      );
    });
    it('all options', () => {
      assert.equal(
        new ThreeTextureOptions({
          anisotrophy: Infinity,
          filter: LinearFilter,
          flipy: false,
        }).toString(),
        '{"filter":1006,"anisotrophy":Infinity,"flipy":false}',
      );
    });
  });
  describe('fromString()', () => {
    it('default options', () => {
      assert.equal(ThreeTextureOptions.fromString('{}').toString(), '{}');
    });
    it('all options', () => {
      assert.deepEqual(
        ThreeTextureOptions.fromString(
          '{"filter":1006,"anisotrophy":Infinity,"flipy":false}',
        ),
        {
          filter: 1006,
          anisotrophy: Infinity,
          flipy: false,
        },
      );
    });
  });
  describe('equals()', () => {
    it('yes', () => {
      const texOpts = new ThreeTextureOptions({anisotrophy: 2, flipy: true});
      assert.equal(texOpts.equals({anisotrophy: 2, flipy: true}), true);
    });
    it('no', () => {
      const texOpts = new ThreeTextureOptions({filter: 666});
      assert.equal(texOpts.equals({filter: 999}), false);
    });
  });
});

/* eslint-env browser */
/* eslint-env mocha */
import assert from 'assert';

import { TextureAtlas } from '..';

describe('TextureAtlas', () => {
  describe('TextureAtlas.load', () => {
    let atlas;

    before((done) => {
      TextureAtlas.load('nobinger.json', '/assets/').then((textureAtlas) => {
        atlas = textureAtlas;
        done();
      });
    });

    it('base texture', () => {
      const baseTex = atlas.baseTexture;
      assert.ok(baseTex);
      assert.equal(baseTex.root, baseTex);
      assert.equal(baseTex.width, 128);
      assert.equal(baseTex.height, 256);
    });

    it('frame: nobinger-blau.png', () => {
      const tex = atlas.frame('nobinger-blau.png');
      assert.ok(tex);
      assert(tex.root !== tex);
      assert.equal(tex.width, 55);
      assert.equal(tex.height, 61);
    });

    it('all frame names', () => {
      assert.deepEqual(atlas.frameNames().sort(), [
        'nobinger-blau.png',
        'nobinger-gold.png',
        'nobinger-grau.png',
        'nobinger-gruen.png',
        'nobinger-lila.png',
        'nobinger-rot.png',
      ].sort());
    });

    it('find some frameNames', () => {
      assert.deepEqual(atlas.frameNames('(blau|gold)').sort(), [
        'nobinger-blau.png',
        'nobinger-gold.png',
      ].sort());
    });

    it('atlas features', () => {
      assert.equal(atlas.getFeature('image'), 'nobinger.png');
    });
  });

  describe('attach frame features to Texture', () => {
    let atlas;

    before((done) => {
      TextureAtlas.load('rbmfs.json', '/assets/').then((textureAtlas) => {
        atlas = textureAtlas;
        done();
      });
    });

    it('"f" should have baselineOffset feature', () => {
      const tex = atlas.frame('f');
      assert.ok(tex);
      assert.equal(tex.width, 5);
      assert.equal(tex.height, 8);
      assert.equal(tex.getFeature('baselineOffset'), -2);
    });

  });
});

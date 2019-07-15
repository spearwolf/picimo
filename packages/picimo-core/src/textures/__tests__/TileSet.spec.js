/* eslint-env browser */
/* eslint-env mocha */
import assert from 'assert';

import { TileSet } from '..';

describe('TileSet', () => {
  describe('TileSet.load', () => {
    let tileset;

    before(async () => {
      tileset = await TileSet.load('nobinger.png', {
        basePath: '/assets/',
        firstId: 4,
        margin: 1,
        padding: 1,
        tileWidth: 55,
        tileHeight: 61,
        tileCount: 6,
      });
    });

    it('baseTexture', () => {
      const baseTex = tileset.baseTexture;
      assert.ok(baseTex);
      assert.equal(baseTex.root, baseTex);
      assert.equal(baseTex.width, 128);
      assert.equal(baseTex.height, 256);
    });

    it('tileWidth', () => assert.equal(tileset.tileWidth, 55));
    it('tileHeight', () => assert.equal(tileset.tileHeight, 61));

    it('tileCount', () => assert.equal(tileset.tileCount, 6));
    it('firstId', () => assert.equal(tileset.firstId, 4));
    it('lastId', () => assert.equal(tileset.lastId, 9));

    it('frame: 0', () => assert.equal(tileset.getTextureById(0), null));
    it('frame: 1', () => assert.equal(tileset.getTextureById(1), null));
    it('frame: 10', () => assert.equal(tileset.getTextureById(10), null));

    it('frame: 4', () => {
      const tex = tileset.getTextureById(4);
      assert.ok(tex);
      assert(tex.root !== tex);
      assert.equal(tex.x, 2);
      assert.equal(tex.y, 2);
      assert.equal(tex.width, 55);
      assert.equal(tex.height, 61);
    });

    it('frame: 5', () => {
      const tex = tileset.getTextureById(5);
      assert.ok(tex);
      assert(tex.root !== tex);
      assert.equal(tex.x, 59);
      assert.equal(tex.y, 2);
      assert.equal(tex.width, 55);
      assert.equal(tex.height, 61);
    });

    it('frame: 8', () => {
      const tex = tileset.getTextureById(8);
      assert.ok(tex);
      assert(tex.root !== tex);
      assert.equal(tex.x, 2);
      assert.equal(tex.y, 128);
      assert.equal(tex.width, 55);
      assert.equal(tex.height, 61);
    });

  });
});

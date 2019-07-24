/* eslint-env browser */
/* eslint-env mocha */
import assert from 'assert';

import { TileSet } from '..';

describe('TileSet', () => {
  describe('TileSet.load', () => {
    let tileset;
    let tileset2;

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
      tileset2 = await TileSet.load('lab-wall-tiles-new.png', {
        basePath: '/assets/',
        firstId: 1,
        margin: 0,
        padding: 0,
        columns: 19,
        tileWidth: 16,
        tileHeight: 16,
        tileCount: 19,
      });
    });

    it('tileset: baseTexture', () => {
      const baseTex = tileset.baseTexture;
      assert.ok(baseTex);
      assert.equal(baseTex.root, baseTex);
      assert.equal(baseTex.width, 128);
      assert.equal(baseTex.height, 256);
    });

    it('tileset: tileWidth', () => assert.equal(tileset.tileWidth, 55));
    it('tileset: tileHeight', () => assert.equal(tileset.tileHeight, 61));

    it('tileset: tileCount', () => assert.equal(tileset.tileCount, 6));
    it('tileset: firstId', () => assert.equal(tileset.firstId, 4));
    it('tileset: lastId', () => assert.equal(tileset.lastId, 9));

    it('tileset: frame: 0', () => assert.equal(tileset.getTextureById(0), null));
    it('tileset: frame: 1', () => assert.equal(tileset.getTextureById(1), null));
    it('tileset: frame: 10', () => assert.equal(tileset.getTextureById(10), null));

    it('tileset: frame: 4', () => {
      const tex = tileset.getTextureById(4);
      assert.ok(tex);
      assert(tex.root !== tex);
      assert.equal(tex.x, 2);
      assert.equal(tex.y, 2);
      assert.equal(tex.width, 55);
      assert.equal(tex.height, 61);
    });

    it('tileset: frame: 5', () => {
      const tex = tileset.getTextureById(5);
      assert.ok(tex);
      assert(tex.root !== tex);
      assert.equal(tex.x, 59);
      assert.equal(tex.y, 2);
      assert.equal(tex.width, 55);
      assert.equal(tex.height, 61);
    });

    it('tileset: frame: 8', () => {
      const tex = tileset.getTextureById(8);
      assert.ok(tex);
      assert(tex.root !== tex);
      assert.equal(tex.x, 2);
      assert.equal(tex.y, 128);
      assert.equal(tex.width, 55);
      assert.equal(tex.height, 61);
    });

    it('tileset2: tileWidth', () => assert.equal(tileset2.tileWidth, 16));
    it('tileset2: tileHeight', () => assert.equal(tileset2.tileHeight, 16));

    it('tileset2: tileCount', () => assert.equal(tileset2.tileCount, 19));
    it('tileset2: firstId', () => assert.equal(tileset2.firstId, 1));
    it('tileset2: lastId', () => assert.equal(tileset2.lastId, 19));

    it('tileset2: frame: 0', () => assert.equal(tileset2.getTextureById(0), null));
  });
});

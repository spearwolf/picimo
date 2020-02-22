/* eslint-env browser */
/* eslint-env mocha */
import assert from 'assert';

import {TileSet} from '..';

describe('TileSet', () => {
  describe('TileSet.load', () => {
    let tileset0;
    let tileset;
    let tileset2;

    before(async () => {
      tileset0 = await TileSet.load('nobinger.png', {
        basePath: '/assets/',
      });
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

    describe('tileset0', () => {
      it('tileWidth', () =>
        assert.equal(tileset0.tileWidth, tileset0.baseTexture.width));
      it('tileHeight', () =>
        assert.equal(tileset0.tileHeight, tileset0.baseTexture.height));

      it('tileCount', () => assert.equal(tileset0.tileCount, 1));
      it('firstId', () => assert.equal(tileset0.firstId, 1));
      it('lastId', () => assert.equal(tileset0.lastId, 1));

      it('frame: 0', () => assert.equal(tileset0.getTextureById(0), null));

      it('frame: 1', () => {
        const tex = tileset0.getTextureById(1);
        assert.ok(tex);
        assert.equal(tex.x, 0);
        assert.equal(tex.y, 0);
        assert.equal(tex.width, tileset0.tileWidth);
        assert.equal(tex.height, tileset0.tileHeight);
      });
    });

    describe('tileset', () => {
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

    describe('tileset2', () => {
      it('tileWidth', () => assert.equal(tileset2.tileWidth, 16));
      it('tileHeight', () => assert.equal(tileset2.tileHeight, 16));

      it('tileCount', () => assert.equal(tileset2.tileCount, 19));
      it('firstId', () => assert.equal(tileset2.firstId, 1));
      it('lastId', () => assert.equal(tileset2.lastId, 19));

      it('frame: 0', () => assert.equal(tileset2.getTextureById(0), null));
    });
  });
});

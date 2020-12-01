/* eslint-env browser */
/* eslint-env jest */
import assert from 'assert';

import {Texture, PowerOf2Image} from '..';

describe('Texture', () => {
  describe('new Texture(<img>)', () => {
    const img = new Image(320, 160);
    const tex = new Texture(img);

    it('image', () => assert.equal(tex.image, img));
    it('parent', () => assert.equal(tex.parent, null));
    it('root', () => assert.equal(tex.root, tex));
    it('width', () => assert.equal(tex.width, 320));
    it('height', () => assert.equal(tex.height, 160));
    it('x', () => assert.equal(tex.x, 0));
    it('y', () => assert.equal(tex.y, 0));
    it('minS', () => assert.equal(tex.minS, 0));
    it('minT', () => assert.equal(tex.minT, 0));
    it('maxS', () => assert.equal(tex.maxS, 1));
    it('maxT', () => assert.equal(tex.maxT, 1));

    it('flipH', () => assert.equal(tex.flipH, false));
    it('flipV', () => assert.equal(tex.flipV, false));
  });

  describe('new Texture(<img>, w, h)', () => {
    const img = new Image(320, 160);
    const tex = new Texture(img, 200, 100);

    it('image', () => assert.equal(tex.image, img));
    it('parent', () => assert.equal(tex.parent, null));
    it('root', () => assert.equal(tex.root, tex));
    it('width', () => assert.equal(tex.width, 200));
    it('height', () => assert.equal(tex.height, 100));
    it('x', () => assert.equal(tex.x, 0));
    it('y', () => assert.equal(tex.y, 0));
    it('minS', () => assert.equal(tex.minS, 0));
    it('minT', () => assert.equal(tex.minT, 0));
    it('maxS', () => assert.equal(tex.maxS, 200 / 320));
    it('maxT', () => assert.equal(tex.maxT, 100 / 160));
  });

  describe('new Texture(<img>, w, h, x, y)', () => {
    const img = new Image(320, 160);
    const tex = new Texture(img, 300, 140, 9, 11);

    it('image', () => assert.equal(tex.image, img));
    it('parent', () => assert.equal(tex.parent, null));
    it('root', () => assert.equal(tex.root, tex));
    it('width', () => assert.equal(tex.width, 300));
    it('height', () => assert.equal(tex.height, 140));
    it('x', () => assert.equal(tex.x, 9));
    it('y', () => assert.equal(tex.y, 11));
    it('minS', () => assert.equal(tex.minS, 9 / 320));
    it('minT', () => assert.equal(tex.minT, 11 / 160));
    it('maxS', () => assert.equal(tex.maxS, (300 + 9) / 320));
    it('maxT', () => assert.equal(tex.maxT, (140 + 11) / 160));
  });

  describe.skip('new Texture(PowerOf2Image)', () => {
    const p2img = new PowerOf2Image('/assets/bird-chicken-penguin.png');
    let tex;

    describe('after complete', () => {
      beforeAll((done) => {
        p2img.loaded.then(() => {
          tex = new Texture(p2img);
          done();
        });
      });

      it('is loaded', () => assert(p2img.isLoaded));
      it('image', () => assert.equal(tex.image, p2img));
      it('imgEl', () => assert.equal(tex.imgEl, p2img.imgEl));
      it('parent', () => assert.equal(tex.parent, null));
      it('root', () => assert.equal(tex.root, tex));
      it('width', () => assert.equal(tex.width, 640));
      it('height', () => assert.equal(tex.height, 480));
      it('x', () => assert.equal(tex.x, 0));
      it('y', () => assert.equal(tex.y, 0));
      it('minS', () => assert.equal(tex.minS, 0));
      it('minT', () => assert.equal(tex.minT, 0));
      it('maxS', () => assert.equal(tex.maxS, 640 / 1024));
      it('maxT', () => assert.equal(tex.maxT, 480 / 512));
    });
  });

  describe.skip('Texture.load(url)', () => {
    let tex;
    beforeAll((done) => {
      Texture.load('/assets/nobinger.png').then((texture) => {
        tex = texture;
        done();
      });
    });

    it('image', () => assert.ok(tex.image instanceof PowerOf2Image));
    it('image.isLoaded', () => assert.ok(tex.image.isLoaded));
    it('image.imgEl', () =>
      assert.ok(tex.image.imgEl instanceof HTMLImageElement));
    it('width', () => assert.equal(tex.width, 128));
    it('height', () => assert.equal(tex.height, 256));
  });

  describe('new Texture(Texture)', () => {
    const img = new Image(320, 160);
    const parent = new Texture(img);
    const tex = new Texture(parent);

    it('image', () => assert.equal(tex.image, null));
    it('parent', () => assert.equal(tex.parent, parent));
    it('root', () => assert.equal(tex.root, parent));
    it('width', () => assert.equal(tex.width, 320));
    it('height', () => assert.equal(tex.height, 160));
    it('x', () => assert.equal(tex.x, 0));
    it('y', () => assert.equal(tex.y, 0));
    it('minS', () => assert.equal(tex.minS, 0));
    it('minT', () => assert.equal(tex.minT, 0));
    it('maxS', () => assert.equal(tex.maxS, 1));
    it('maxT', () => assert.equal(tex.maxT, 1));
  });

  describe('new Texture(Texture(<img>, w, h, x, y), w, h, x, y)', () => {
    const img = new Image(320, 160);
    const parent = new Texture(img, 200, 120, 4, 6);
    const tex = new Texture(parent, 100, 50, 20, 10);

    it('image', () => assert.equal(tex.image, null));
    it('parent', () => assert.equal(tex.parent, parent));
    it('root', () => assert.equal(tex.root, parent));
    it('width', () => assert.equal(tex.width, 100));
    it('height', () => assert.equal(tex.height, 50));
    it('x', () => assert.equal(tex.x, 20));
    it('y', () => assert.equal(tex.y, 10));
    it('minS', () => assert.equal(tex.minS, (4 + 20) / 320));
    it('minT', () => assert.equal(tex.minT, (6 + 10) / 160));
    it('maxS', () => assert.equal(tex.maxS, (4 + 20 + 100) / 320));
    it('maxT', () => assert.equal(tex.maxT, (6 + 10 + 50) / 160));
  });

  describe('clone()', () => {
    const img = new Image(320, 160);
    const tex = new Texture(img, 200, 120, 4, 6);
    const tex2 = tex.clone();

    it('tex != tex2', () => assert.notEqual(tex, tex2));

    it('uuid is ok', () => assert.ok(tex2.uuid));
    it('uuid is not the same', () => assert.notEqual(tex2.uuid, tex.uuid));

    it('image', () => assert.equal(tex2.image, img));
    it('parent is null', () => assert.equal(tex2.parent, null));
    it('root', () => assert.equal(tex2.root, tex2));

    it('width', () => assert.equal(tex2.width, tex.width));
    it('height', () => assert.equal(tex2.height, tex.height));
    it('x', () => assert.equal(tex2.x, tex.x));
    it('y', () => assert.equal(tex2.y, tex.y));
    it('minS', () => assert.equal(tex2.minS, tex.minS));
    it('minT', () => assert.equal(tex2.minT, tex.minT));
    it('maxS', () => assert.equal(tex2.maxS, tex.maxS));
    it('maxT', () => assert.equal(tex2.maxT, tex.maxT));
  });

  describe('clone(tex-with-parent)', () => {
    const img = new Image(320, 160);
    const parent = new Texture(img, 200, 120, 4, 6);
    const tex = new Texture(parent, 100, 50, 20, 10);
    const tex2 = tex.clone();

    it('tex != tex2', () => assert.notEqual(tex, tex2));

    it('uuid is the same as from the parent', () =>
      assert.equal(tex2.uuid, parent.uuid));

    it('image is null', () => assert.equal(tex2.image, null));
    it('parent', () => assert.equal(tex2.parent, parent));
    it('root', () => assert.equal(tex2.root, parent));

    it('width', () => assert.equal(tex2.width, tex.width));
    it('height', () => assert.equal(tex2.height, tex.height));
    it('x', () => assert.equal(tex2.x, tex.x));
    it('y', () => assert.equal(tex2.y, tex.y));
    it('minS', () => assert.equal(tex2.minS, tex.minS));
    it('minT', () => assert.equal(tex2.minT, tex.minT));
    it('maxS', () => assert.equal(tex2.maxS, tex.maxS));
    it('maxT', () => assert.equal(tex2.maxT, tex.maxT));
  });

  describe('flipHorizontal()', () => {
    const img = new Image(320, 160);
    const parent = new Texture(img, 200, 120, 4, 6);
    const tex = new Texture(parent, 100, 50, 20, 10);
    const tex2 = tex.clone();

    it('flipHorizontal() returns this', () =>
      assert.equal(tex2.flipHorizontal(), tex2));

    it('width', () => assert.equal(tex2.width, tex.width));
    it('height', () => assert.equal(tex2.height, tex.height));
    it('x', () => assert.equal(tex2.x, tex.x));
    it('y', () => assert.equal(tex2.y, tex.y));

    it('minS', () => assert.equal(tex2.minS, tex.maxS));
    it('minT', () => assert.equal(tex2.minT, tex.minT));
    it('maxS', () => assert.equal(tex2.maxS, tex.minS));
    it('maxT', () => assert.equal(tex2.maxT, tex.maxT));
  });

  describe('flipVertical()', () => {
    const img = new Image(320, 160);
    const parent = new Texture(img, 200, 120, 4, 6);
    const tex = new Texture(parent, 100, 50, 20, 10);
    const tex2 = tex.clone();

    it('flipVertical() returns this', () =>
      assert.equal(tex2.flipVertical(), tex2));

    it('width', () => assert.equal(tex2.width, tex.width));
    it('height', () => assert.equal(tex2.height, tex.height));
    it('x', () => assert.equal(tex2.x, tex.x));
    it('y', () => assert.equal(tex2.y, tex.y));

    it('minS', () => assert.equal(tex2.minS, tex.minS));
    it('minT', () => assert.equal(tex2.minT, tex.maxT));
    it('maxS', () => assert.equal(tex2.maxS, tex.maxS));
    it('maxT', () => assert.equal(tex2.maxT, tex.minT));
  });
});

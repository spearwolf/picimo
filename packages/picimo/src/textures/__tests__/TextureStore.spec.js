/* eslint-env browser */
/* eslint-env mocha */
import assert from 'assert';

import {WebGLRenderer} from 'three';

import {TextureFactory, TextureStore, Texture} from '..';

describe('TextureStore', () => {
  let renderer;
  let factory;
  let canvas;

  before(() => {
    renderer = new WebGLRenderer();
    factory = new TextureFactory(renderer);
    canvas = document.createElement('canvas');
  });

  after(() => {
    renderer.dispose();
  });

  it('create()', () => {
    const store = new TextureStore(factory);
    assert.ok(store);
  });

  describe('setTexture()', () => {
    it('without options', () => {
      // arrange
      const store = new TextureStore(factory);
      const tex = new Texture(canvas);
      // act
      store.setTexture('foo', tex);
      // assert
      const state = store.state.foo?.picimo;
      assert.ok(state);
      assert.equal(state.serial, 0);
      assert.equal(store.getValueObject(state.valueId), tex);
      assert.equal(state.options, '{}');
    });
    it('with options', () => {
      // arrange
      const store = new TextureStore(factory);
      const tex = new Texture(canvas);
      // act
      store.setTexture('foo', tex, {flipy: false, anisotrophy: Infinity});
      // assert
      const state = store.state.foo?.picimo;
      assert.ok(state);
      assert.equal(state.serial, 0);
      assert.equal(store.getValueObject(state.valueId), tex);
      assert.equal(state.options, '{"anisotrophy":Infinity,"flipy":false}');
    });
  });
});

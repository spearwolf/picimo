/* eslint-env browser */
/* eslint-env mocha */
import assert from 'assert';

import sinon from 'sinon';

import {WebGLRenderer} from 'three';

import {TextureFactory, TextureStore, Texture} from '..';

describe('TextureStore', () => {
  let renderer;
  let factory;
  let canvas;
  let tex;

  before(() => {
    renderer = new WebGLRenderer();
    factory = new TextureFactory(renderer);
    canvas = document.createElement('canvas');
    tex = new Texture(canvas);
  });

  after(() => {
    renderer.dispose();
  });

  it('create()', () => {
    const store = new TextureStore(factory);
    assert.ok(store);
  });

  describe('setPicimoTexture()', () => {
    it('without options', () => {
      // arrange
      const store = new TextureStore(factory);
      const {state: prevState} = store;
      // act
      store.setPicimoTexture('foo', tex);
      // assert
      assert.notStrictEqual(store.state, prevState);
      const state = store.state.foo?.picimo;
      assert.ok(state);
      assert.equal(state.serial, 0);
      assert.equal(store.getValueObject(state.valueId), tex);
      assert.equal(state.options, '{}');
    });
    it('with options', () => {
      // arrange
      const store = new TextureStore(factory);
      const {state: prevState} = store;
      // act
      store.setPicimoTexture('foo', tex, {flipy: false, anisotrophy: Infinity});
      // assert
      assert.notStrictEqual(store.state, prevState);
      const state = store.state.foo?.picimo;
      assert.ok(state);
      assert.equal(state.serial, 0);
      assert.equal(store.getValueObject(state.valueId), tex);
      assert.equal(state.options, '{"anisotrophy":Infinity,"flipy":false}');
    });
    it('update options', () => {
      // arrange
      const store = new TextureStore(factory);
      store.setPicimoTexture('foo', tex);
      const {state: prevState} = store;
      // act
      store.setPicimoTexture('foo', tex, {filter: 123});
      // assert
      assert.notStrictEqual(store.state, prevState);
      const state = store.state.foo.picimo;
      assert.strictEqual(state.valueId, prevState.foo.picimo.valueId);
      assert.notEqual(state.options, prevState.foo.picimo.options);
      assert(state.serial > prevState.foo.picimo.serial);
    });
    it('update texture value object', () => {
      // arrange
      const store = new TextureStore(factory);
      store.setPicimoTexture('foo', tex);
      const {state: prevState} = store;
      const tex2 = new Texture(canvas);
      // act
      store.setPicimoTexture('foo', tex2);
      // assert
      assert.notStrictEqual(store.state, prevState);
      const state = store.state.foo.picimo;
      assert.notStrictEqual(state.valueId, prevState.foo.picimo.valueId);
      assert.equal(state.options, prevState.foo.picimo.options);
      assert(state.serial > prevState.foo.picimo.serial);
    });
    it('update nothing', () => {
      // arrange
      const store = new TextureStore(factory);
      store.setPicimoTexture('foo', tex);
      const {state: prevState} = store;
      // act
      store.setPicimoTexture('foo', tex);
      // assert
      assert.strictEqual(store.state, prevState);
    });
  });

  describe('touchPicimoTexture()', () => {
    it('texture exists', () => {
      // arrange
      const store = new TextureStore(factory);
      store.setPicimoTexture('tex', tex);
      const {state: prevState} = store;
      // act
      store.touchPicimoTexture('tex');
      // assert
      assert.notStrictEqual(store.state, prevState);
      assert.strictEqual(
        store.state.tex.picimo.valueId,
        prevState.tex.picimo.valueId,
      );
      assert.equal(
        store.state.tex.picimo.options,
        prevState.tex.picimo.options,
      );
      assert(store.state.tex.picimo.serial > prevState.tex.picimo.serial);
    });
    it('texture not exists', () => {
      // arrange
      const store = new TextureStore(factory);
      const {state} = store;
      // act
      store.touchPicimoTexture('fooBarPlah!');
      // assert
      assert.strictEqual(state, store.state);
    });
  });

  describe('getThreeTexture()', () => {
    describe('sourceType is "picimo"', () => {
      it('1st call should create a new THREE.Texture', () => {
        // arrange
        const store = new TextureStore(factory);
        store.setPicimoTexture('plah', tex);
        const {state: prevState} = store;
        const textureCreatedSpy = sinon.spy();
        store.on('threeTextureCreated', textureCreatedSpy);
        // act
        const tex3 = store.getThreeTexture('plah');
        // assert
        assert.ok(tex3);
        assert.ok(textureCreatedSpy.called);
        assert.notStrictEqual(store.state, prevState);
        tex3.dispose();
      });
      it('2nd call should not change the store state', () => {
        // arrange
        const store = new TextureStore(factory);
        const textureCreatedSpy = sinon.spy();
        store.on('threeTextureCreated', textureCreatedSpy);
        store.setPicimoTexture('plah', tex);
        const firstTex3 = store.getThreeTexture('plah');
        assert.ok(firstTex3);
        const {state: prevState} = store;
        // act
        const tex3 = store.getThreeTexture('plah');
        // assert
        assert.ok(tex3);
        assert.equal(textureCreatedSpy.callCount, 1);
        assert.strictEqual(firstTex3, tex3);
        assert.strictEqual(store.state, prevState);
        tex3.dispose();
      });
      it('2nd call should recreate the THREE.Texture if the picimo texture was updated in the meantime', () => {
        // arrange
        const store = new TextureStore(factory);
        const textureCreatedSpy = sinon.spy();
        const disposeTextureSpy = sinon.spy();
        store.on('threeTextureCreated', textureCreatedSpy);
        store.on('disposeThreeTexture', disposeTextureSpy);
        store.setPicimoTexture('plah', tex);
        // act
        const tex1 = store.getThreeTexture('plah');
        store.touchPicimoTexture('plah');
        const {state: prevState} = store;
        const tex2 = store.getThreeTexture('plah');
        // assert
        assert.ok(tex1);
        assert.ok(tex2);
        assert.equal(textureCreatedSpy.callCount, 2);
        assert.equal(disposeTextureSpy.callCount, 1);
        assert.notStrictEqual(tex1, tex2);
        assert.notStrictEqual(store.state, prevState);
        tex1.dispose();
        tex2.dispose();
      });
    });
  });
});

/* eslint-env mocha */
import assert from 'assert';

import sinon from 'sinon';

import {DisposableContext} from '../DisposableContext';
import {getGlobalLogConfig, LogLevel} from '../Logger';

getGlobalLogConfig().setLogLevel(
  'picimo.DisposableContext',
  LogLevel.ERROR | LogLevel.WARN,
);

describe('DisposableContext', () => {
  it('create context should work without arguments', () => {
    assert(new DisposableContext());
  });

  it('get(key) with a pre defined value should return the value without calling create() before', () => {
    // assemble
    const Foo = {};
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    ctx.create({
      create,
      key: 'foo',
      value: Foo,
      dispose: () => undefined,
    });
    // act
    const foo = ctx.get('foo');
    // assert
    assert.strictEqual(Foo, foo);
    assert.equal(create.callCount, 0);
  });

  it('get(key) should call create() helper if value is undefined or null', () => {
    // assemble
    const ctx = new DisposableContext();
    const createFoo = sinon.spy(() => ({}));
    const createBar = sinon.spy(() => ({}));
    const fooDef = {
      create: createFoo,
      value: null,
      key: 'foo',
      dispose: () => undefined,
    };
    const barDef = {
      create: createBar,
      key: 'bar',
      dispose: () => undefined,
    };
    ctx.create(fooDef);
    ctx.create(barDef);
    // act
    const foo0 = ctx.get('foo');
    const foo1 = ctx.get(fooDef);
    const bar0 = ctx.get('bar');
    const bar1 = ctx.get(barDef);
    // assert
    assert.ok(foo0);
    assert.strictEqual(foo0, foo1);
    assert.ok(bar0);
    assert.strictEqual(bar0, bar1);
    assert.ok(createFoo.calledOnce);
    assert.ok(createBar.calledOnce);
    assert.ok(createFoo.calledWith(ctx));
    assert.ok(createBar.calledWith(ctx));
  });

  it('dispose() should clear the value', () => {
    // assemble
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    const dispose = sinon.spy(() => undefined);
    ctx.create({
      create,
      dispose,
      key: 'foo',
    });
    // act
    const foo0 = ctx.get('foo');
    ctx.dispose('foo');
    const foo1 = ctx.get('foo');
    const foo2 = ctx.get('foo');
    // assert
    assert.ok(foo0);
    assert.ok(foo1);
    assert.ok(foo2);
    assert.notStrictEqual(foo0, foo1);
    assert.strictEqual(foo1, foo2);
    assert.equal(create.callCount, 2);
    assert.ok(create.calledWith(ctx));
    assert.ok(dispose.calledWith(foo0, ctx));
  });

  describe('multiple calls to create()', () => {
    it('should not clear value if value is already created and create() helper is unchanged', () => {
      // assemble
      const ctx = new DisposableContext();
      const create = sinon.spy(() => ({}));
      const dispose = sinon.spy(() => undefined);
      const propDef = {
        create,
        dispose,
        key: 'foo',
        value: undefined,
      };
      ctx.create(propDef);
      // act
      const foo0 = ctx.get('foo');
      ctx.create(propDef);
      const foo1 = ctx.get('foo');
      // assert
      assert.ok(foo0);
      assert.ok(foo1);
      assert.strictEqual(foo0, foo1);
      assert.equal(create.callCount, 1);
      assert.equal(dispose.callCount, 0);
    });

    it('should clear value if value is already created and create() helper changed', () => {
      // assemble
      const ctx = new DisposableContext();
      const create0 = sinon.spy(() => ({}));
      const create1 = sinon.spy(() => ({}));
      const dispose0 = sinon.spy(() => 0);
      const dispose1 = sinon.spy(() => 0);
      const propDef = {
        create: create0,
        dispose: dispose0,
        key: 'foo',
        value: undefined,
      };
      ctx.create(propDef);
      // act
      const foo0 = ctx.get('foo');
      ctx.create({...propDef, create: create1, dispose: dispose1, value: null});
      const foo1 = ctx.get('foo');
      // assert
      assert.ok(foo0);
      assert.ok(foo1);
      assert.notStrictEqual(foo0, foo1);
      assert.equal(create0.callCount, 1);
      assert.equal(create1.callCount, 1);
      assert.equal(dispose0.callCount, 1, 'dispose0() should be called 1x');
      assert.equal(
        dispose1.callCount,
        0,
        "dispose1() shouldn't be called at all",
      );
      assert.ok(
        dispose0.calledWith(foo0, ctx),
        'dispose0() should be called with ctx and foo0',
      );
    });

    it('should dispose() previous value if value is already created and a new value is given', () => {
      // assemble
      const ctx = new DisposableContext();
      const create = sinon.spy(() => ({}));
      const dispose = sinon.spy(() => 0);
      const propDef = {
        create,
        dispose,
        key: 'foo',
      };
      ctx.create(propDef);
      // act
      const foo0 = ctx.get('foo');
      ctx.create({...propDef, value: {}});
      const foo1 = ctx.get('foo');
      // assert
      assert.ok(foo0);
      assert.ok(foo1);
      assert.notStrictEqual(foo0, foo1);
      assert.equal(create.callCount, 1);
      assert.equal(dispose.callCount, 1);
      assert.ok(dispose.calledWith(foo0, ctx));
    });
  });

  it('disposeAll() should clear and remove all property values', () => {
    // assemble
    const ctx = new DisposableContext();
    const create0 = sinon.spy(() => ({}));
    const dispose0 = sinon.spy(() => 0);
    const create1 = sinon.spy(() => ({}));
    const dispose1 = sinon.spy(() => 0);
    ctx.create({
      create: create0,
      dispose: dispose0,
      key: 'foo',
    });
    ctx.create({
      create: create1,
      dispose: dispose1,
      key: 'bar',
    });
    const foo0 = ctx.get('foo');
    const bar0 = ctx.get('bar');
    // act
    ctx.disposeAll();
    // assert
    const foo1 = ctx.get('foo');
    const bar1 = ctx.get('bar');
    assert.ok(foo0);
    assert.ok(bar0);
    assert.strictEqual(foo1, undefined);
    assert.strictEqual(bar1, undefined);
    assert.ok(create0.calledOnce);
    assert.ok(create1.calledOnce);
    assert.ok(dispose0.calledOnce);
    assert.ok(dispose1.calledOnce);
  });
});

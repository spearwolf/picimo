/* eslint-env jest */
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

  it('get(key) with a pre-defined value should return the value without calling create() before', () => {
    // assemble
    const Foo = {};
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    ctx.set({
      create,
      key: 'foo',
      value: Foo,
      // dispose: () => undefined,
    });
    // act
    const foo = ctx.get('foo');
    // assert
    assert.strictEqual(Foo, foo);
    assert.equal(create.callCount, 0);
    assert.ok(ctx.meta('foo')?.serial > 0);
  });

  it('get(key) should call create() helper if value is undefined|null', () => {
    // assemble
    const ctx = new DisposableContext();
    const createFoo = sinon.spy(() => ({}));
    const createBar = sinon.spy(() => ({}));
    const fooDef = {
      create: createFoo,
      value: null,
      key: 'foo',
    };
    const barDef = {
      create: createBar,
      key: 'bar',
    };
    ctx.set(fooDef);
    ctx.set(barDef);
    const serialFoo0 = ctx.meta(fooDef)?.serial;
    const serialBar0 = ctx.meta(barDef)?.serial;
    // act
    const foo0 = ctx.get('foo');
    const serialFoo1 = ctx.meta(fooDef)?.serial;
    const foo1 = ctx.get(fooDef);
    const serialFoo2 = ctx.meta('foo')?.serial;
    const bar0 = ctx.get('bar');
    const serialBar1 = ctx.meta('bar')?.serial;
    const bar1 = ctx.get(barDef);
    const serialBar2 = ctx.meta(barDef)?.serial;
    // assert
    assert.ok(foo0, 'foo0');
    assert.strictEqual(foo0, foo1);
    assert.ok(bar0, 'bar0');
    assert.strictEqual(bar0, bar1);
    assert.ok(createFoo.calledOnce, 'createFoo.calledOnce');
    assert.ok(createBar.calledOnce, 'createBar.calledOnce');
    assert.ok(createFoo.calledWith(ctx), 'createFoo.calledWith(ctx)');
    assert.ok(createBar.calledWith(ctx), 'createBar.calledWith(ctx)');
    assert.ok(serialFoo0 > 0, 'foo0 serial should be > 0');
    assert.ok(
      serialFoo1 > serialFoo0,
      'foo1 serial should by greater than foo0 serial',
    );
    assert.strictEqual(serialFoo2, serialFoo1);
    assert.ok(serialBar0 > 0, 'bar0 serial should be > 0');
    assert.ok(
      serialBar1 > serialBar0,
      `bar1 serial should by greater than bar0 serial, bar2:${serialBar2}, bar1:${serialBar1}, bar0:${serialBar0}`,
    );
    assert.strictEqual(serialBar2, serialBar1);
  });

  it('dispose() should clear (set to undefined) the value', () => {
    // assemble
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    const dispose = sinon.spy(() => undefined);
    ctx.set({
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

  describe('multiple calls to set()', () => {
    it('should not clear value if value is already created and create() function is unchanged', () => {
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
      ctx.set(propDef);
      // act
      const foo0 = ctx.get('foo');
      ctx.set(propDef);
      const foo1 = ctx.get('foo');
      // assert
      assert.ok(foo0);
      assert.ok(foo1);
      assert.strictEqual(foo0, foo1);
      assert.equal(create.callCount, 1);
      assert.equal(dispose.callCount, 0);
    });

    it('should clear the value if already created and the create() function changed', () => {
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
      ctx.set(propDef);
      // act
      const foo0 = ctx.get('foo');
      ctx.set({...propDef, create: create1, dispose: dispose1, value: null});
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

    it('should dispose() previous value if the value is already created and a new value is given', () => {
      // assemble
      const ctx = new DisposableContext();
      const create = sinon.spy(() => ({}));
      const dispose = sinon.spy(() => 0);
      const propDef = {
        create,
        dispose,
        key: 'foo',
      };
      ctx.set(propDef);
      // act
      const foo0 = ctx.get('foo');
      ctx.set({...propDef, value: {}});
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

  it('clear() should clear and remove all property definitions', () => {
    // assemble
    const ctx = new DisposableContext();
    const create0 = sinon.spy(() => ({}));
    const dispose0 = sinon.spy(() => 0);
    const create1 = sinon.spy(() => ({}));
    const dispose1 = sinon.spy(() => 0);
    ctx.set({
      create: create0,
      dispose: dispose0,
      key: 'foo',
    });
    ctx.set({
      create: create1,
      dispose: dispose1,
      key: 'bar',
    });
    const foo0 = ctx.get('foo');
    const bar0 = ctx.get('bar');
    // act
    ctx.clear();
    // assert
    const foo1 = ctx.get('foo');
    const bar1 = ctx.get('bar');
    assert.ok(foo0);
    assert.ok(bar0);
    assert.strictEqual(foo1, undefined);
    assert.strictEqual(bar1, undefined);
    assert.deepStrictEqual(ctx.meta('foo'), {serial: 0, refCount: -1});
    assert.deepStrictEqual(ctx.meta('bar'), {serial: 0, refCount: -1});
    assert.ok(!ctx.has('foo'));
    assert.ok(!ctx.has('bar'));
    assert.ok(create0.calledOnce);
    assert.ok(create1.calledOnce);
    assert.ok(dispose0.calledOnce);
    assert.ok(dispose1.calledOnce);
  });

  it('increase or decrease the reference counter', () => {
    // assemble
    const ctx = new DisposableContext();
    const foo = {
      key: 'foo',
      value: 123,
    };
    ctx.set(foo);
    const refC = [];
    // act
    refC.push(ctx.meta(foo).refCount);
    refC.push(ctx.incRefCount(foo));
    refC.push(ctx.incRefCount(foo));
    refC.push(ctx.decRefCount(foo));
    refC.push(ctx.decRefCount(foo));
    refC.push(ctx.decRefCount(foo));
    refC.push(ctx.incRefCount('bar'));
    refC.push(ctx.decRefCount('bar'));
    // assert
    assert.deepStrictEqual(refC, [-1, 1, 2, 1, 0, 0, -1, -1]);
  });

  it('disposeUnref() should only dispose values which have a reference count of 0', () => {
    // assemble
    const ctx = new DisposableContext();
    const foo = {
      value: {},
      dispose: sinon.spy(() => 0),
      key: 'foo',
    };
    const bar = {
      value: {},
      dispose: sinon.spy(() => 0),
      key: 'bar',
    };
    const plah = {
      value: {},
      dispose: sinon.spy(() => 0),
      key: 'plah',
    };
    const pho = {
      value: {},
      dispose: sinon.spy(() => 0),
      key: 'pho',
    };
    ctx.set(foo);
    ctx.set(bar);
    ctx.set(plah);
    ctx.set(pho);

    ctx.incRefCount(foo); // => 1

    ctx.incRefCount(bar);
    ctx.incRefCount(bar); // => 2

    ctx.incRefCount(plah);
    ctx.decRefCount(plah); // => 0

    // act
    ctx.disposeUnref();

    // assert
    assert.strictEqual(
      foo.dispose.callCount,
      0,
      'foo->dispose should not be called',
    );
    assert.strictEqual(
      bar.dispose.callCount,
      0,
      'bar->dispose should not be called',
    );
    assert.strictEqual(
      plah.dispose.callCount,
      1,
      'plah->dispose should be called',
    );
    assert.strictEqual(
      pho.dispose.callCount,
      0,
      'pho->dispose should not be called',
    );
  });

  it('serial works as expected', () => {
    const ctx = new DisposableContext();
    assert.strictEqual(ctx.serial, 1);

    ctx.set({key: 'foo', value: 'abc'});
    assert.strictEqual(ctx.serial, 2);
    assert.strictEqual(ctx.meta('foo').serial, 1);

    ctx.set({key: 'bar', create: () => 'plah!'});
    assert.strictEqual(ctx.serial, 3);
    assert.strictEqual(ctx.meta('bar').serial, 1);

    ctx.set({key: 'foo', value: 'def'});
    assert.strictEqual(ctx.serial, 4);
    assert.strictEqual(ctx.meta('foo').serial, 2);
    assert.strictEqual(ctx.meta('bar').serial, 1);
    assert.strictEqual(ctx.meta('xyz').serial, 0);

    ctx.get('bar');
    assert.strictEqual(ctx.serial, 5);
    assert.strictEqual(ctx.meta('bar').serial, 2);
    assert.strictEqual(ctx.meta('foo').serial, 2);
    assert.strictEqual(ctx.meta('xyz').serial, 0);

    assert.strictEqual(ctx.meta('bar').refCount, -1);

    ctx.incRefCount('bar');
    assert.strictEqual(ctx.meta('bar').refCount, 1);
    assert.strictEqual(ctx.meta('bar').serial, 2);
    assert.strictEqual(ctx.serial, 5);

    ctx.incRefCount('bar');
    ctx.incRefCount('bar');
    assert.strictEqual(ctx.meta('bar').refCount, 3);
    assert.strictEqual(ctx.meta('bar').serial, 2);
    assert.strictEqual(ctx.serial, 5);

    ctx.decRefCount('bar');
    ctx.decRefCount('bar');
    ctx.decRefCount('bar');
    assert.strictEqual(ctx.meta('bar').refCount, 0);
    assert.strictEqual(ctx.meta('bar').serial, 2);
    assert.strictEqual(ctx.serial, 5);

    ctx.disposeUnref();
    assert.strictEqual(ctx.meta('bar').refCount, 0);
    assert.strictEqual(ctx.meta('bar').serial, 3);
    assert.strictEqual(ctx.serial, 6);

    ctx.disposeUnref();
    assert.strictEqual(ctx.meta('bar').refCount, 0);
    assert.strictEqual(ctx.meta('bar').serial, 3);
    assert.strictEqual(ctx.serial, 6);
  });
});

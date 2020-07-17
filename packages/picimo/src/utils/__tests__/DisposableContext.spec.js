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
  it('create without arguments', () => {
    assert(new DisposableContext());
  });

  it('get(name) with pre-defined value', () => {
    // assemble
    const Foo = {};
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    ctx.create({
      create,
      name: 'foo',
      value: Foo,
      dispose: () => undefined,
    });
    // act
    const foo = ctx.get('foo');
    // assert
    assert.strictEqual(Foo, foo);
    assert.equal(create.callCount, 0);
  });

  it('create(..) and get(name)', () => {
    // assemble
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    ctx.create({
      create,
      name: 'foo',
      dispose: () => undefined,
    });
    // act
    const foo0 = ctx.get('foo');
    const foo1 = ctx.get('foo');
    // assert
    assert.ok(foo0);
    assert.strictEqual(foo0, foo1);
    assert.ok(create.calledOnce);
  });

  it('create, get, dispose, get ..', () => {
    // assemble
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    ctx.create({
      create,
      name: 'foo',
      dispose: () => undefined,
    });
    // act
    const foo0 = ctx.get('foo');
    ctx.dispose('foo');
    const foo1 = ctx.get('foo');
    // assert
    assert.ok(foo0);
    assert.ok(foo1);
    assert.notStrictEqual(foo0, foo1);
    assert.ok(create.callCount, 2);
  });

  it('create, get, create, get!', () => {
    // assemble
    const ctx = new DisposableContext();
    const create = sinon.spy(() => ({}));
    const propDef = {
      create,
      name: 'foo',
      dispose: () => undefined,
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
    assert.ok(create.callCount, 1);
  });
});

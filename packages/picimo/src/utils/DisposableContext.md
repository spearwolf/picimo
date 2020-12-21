
# DisposableContext

## Create Context

```js
ctx = new DisposableContext();
```

## Set Value

### by `value`

```js
ctx.set({ key: 'foo', value: FOO })

ctx.set({ key: 'foo', value: FOO, dispose: (foo, ctx) => 0 })
```

### with a `create()` function

```js
ctx.set({ key: 'foo', create: (ctx) => FOO })

ctx.set({ key: 'foo', create: (ctx) => FOO, dispose: (foo, ctx) => 0 })
```

## Get/Has value

```js
ctx.get('foo')
ctx.get({ key: 'foo' })

ctx.has('foo')
ctx.has({ key: 'foo' })
```

> A value is either *set* or *undefined* but never *null*!

## Meta Info

### Read Meta Info

```js
const { serial, refCount } = ctx.meta('foo')

const { serial, refCount } = ctx.meta({ key: 'foo' })
```

- _meta()_ will always return an object &mdash; even if the property is not defined
- the _serial_ starts at 1, but if _serial_ is 0, then no property has been defined yet
- the _refCount_ is initialized with -1, which indicates that there was no reference counting for this property yet

### Serial

```js
ctx.serial  // starts at 1

ctx.touch('foo')              // ctx.serial == 2
ctx.touch({ key: 'bar' })     // ctx.serial == 3
```

> *ctx.serial* is the fastest way to check if any value has changed

This is a shared serial. If anything changes within the entire context, the serial automatically increases.


### Reference Counter

```js
ctx.incRefCount('foo')
ctx.incRefCount({ key: 'foo' })

ctx.decRefCount('foo')
ctx.decRefCount({ key: 'foo' })
```

> Changes to the reference counter do not affect the serial!


## Dispose

```js
ctx.dispose('foo')
ctx.dispose({ key: 'foo' })

ctx.disposeAll()  // dispose all values but do not remove the property definitions

ctx.disposeUnref()  // dispose all values which have a reference count of 0

ctx.clear()  // dispose all values and remove all property definitions
```


# DisposableContext

## Create Context

```js
ctx = new DisposableContext();
```

## Set by Value

```js
ctx.set({ key: 'foo', value: FOO })

ctx.set({ key: 'foo', value: FOO, dipose: (foo, ctx) => 0 })
```

## Set with `create()`

```js
ctx.set({ key: 'foo', create: (ctx) => FOO })

ctx.set({ key: 'foo', create: (ctx) => FOO, dispose: (foo, ctx) => 0 })
```

## Get value

```js
ctx.get('foo')

ctx.get({ key: 'foo' })
```

## Dispose

```js
ctx.dispose('foo')
ctx.dispose({ key: 'foo' })

ctx.disposeAll()

ctx.disposeAll(false)  // dispose all values but do not clear the registry
```

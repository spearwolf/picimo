# Projection

## Configuration

A `Projection` is configured by a set of **rules** similar to _css styles and media queries_.

A rule may have one or more **constraints**. The first rule applies where constraints fit.

If a rule has no constraints it always fits.

A rule has a **specs** section in which the camera is configured by one or more options.


## Syntax

### Overall Structure

```js
const rules = [
    {
        constraints: [  # constraints are optional
            # ... constraints
        ],
        specs: [
            # ... options
        ],
    },
    # ... more rules
]
```


### Constraints

#### Orientation

```typescript
orientation = 'portait' | 'landscape'
```

`portait`: the height is greater than or equal to the width

`landscape`: the width is greater than the height


#### Viewport Size

```typescript
minWidth: number
maxWidth: number
minHeight: number
maxHeight: number
```


### Specs

#### View Frustum Size

```typescript
width: number
height: number
```

The desired size. But the final sizes may be different, depending on the `fit` option and the viewport size.


#### View Fit

```typescript
fit: 'contain' | 'cover' | 'fill'
```

see [https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) for details


#### Pixel Size

```typescript
pixelZoom: 'number'
```

With this _exclusive_ option the size of the camera view frustum is defined by the _css pixel size_ of the html canvas and a _multiplier_.

If this option is used all other specs have no effect.

i.e., if set to `2` while the canvas size is `320x240` then the view size is `160x120` pixels.


# Projection

The underlying concept of the `Projection` is that ..
- the view into the 3d world is projected from the camera on a 2d _projection plane_
- the _dimension_ of the projection plane depends on both the camera and the dimension of the render buffer target

From a technical point of view a `Projection` creates and updates a [Camera](https://threejs.org/docs/#api/en/cameras/Camera).
In addition to the access to the `Camera` it offers some handy attributes and methods to get infos about the _projection plane_:
- `.width: number` the width of the projection plane
- `.height: number` the height of the projection plane
- `.pixelRatioH: number` the horizontal ratio of the resolution in pixels of the current render buffer target to the width of the projection plane
- `.pixelRatioV: number` the vertical ratio of the resolution in pixels of the current render buffer target to the height of the projection plane
- `.getZoom(distanceToProjectionPlane: number) => number`

Note that the `Projection` is an interface and not intended to be created directly; you probably want a specialized projection class like:
- `OrthographicProjection`
- `ParallaxProjection`

## General Usage

1. Create the projection (eg. configure a parallax projection for the display canvas, or define an orthogonal projection for your render-to-texture target)
2. (Repeatedly) update the projection by calling `projection.updateViewRect(width, height)` on _each frame_, or whenever the render-to-texture buffer dimension changes)
3. Use the `projection.getCamera()` to render your scene

## Configuration

Both `OrthographicProjection` as well as `ParallaxProjection` are configured by a set of **rules** similar to _css styles and media queries_.

These rules determine how the dimension of the projection plane should be, based on the resolution of the render target (&larr; `projection.updateViewRect(width, height)`)

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

If the following properties apply to the render target:

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

Specify the dimension of the projection plane:

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

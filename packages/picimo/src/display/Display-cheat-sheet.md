# Display

## Create

```html
<div picimo display-mode="antialias-quality" resize-strategy="fullscreen"></div>
```

```js
import {Display, Stage2D, ParallaxProjection} from 'picimo';

const display = new Display(document.querySelector('[picimo]')/*, options */)

display.stage = new Stage2D(
  new ParallaxProjection(Plane.XY, {pixelZoom: 1})
);

display.start();
```

## HTML Attributes

| attribute | description |
|-|-|
| resize-strategy | `"window"` \| `"fullscreen"` |
| display-mode | `"pixelated"` \| `"antialias-quality"` \| `"antialias-performance"` |
| pixel-ratio | _number_ |
| go-fullscreen-on-device-rotate | _boolean_ |


## Options

| option | description |
|-|-|
| resizeStrategy | _HTMLElement_ \| `"window"` \| `"fullscreen"` \| `(display) => {width, height}` |
| mode | `"pixelated"` \| `"antialias-quality"` \| `"antialias-performance"` |
| pixel-ratio | _number_ \| `undefined` |
| go-fullscreen-on-device-rotate | _boolean_ |
| clearColor |  _number_ \| _string_ \| _THREE.Color_ |
| autoClear | _boolean_ |

## Properties

| property | description |
|-|-|
| renderer<sub>readonly</sub> | _THREE.WebGLRenderer_ |
| canvas<sub>readonly</sub> | _HTMLCanvasElement_ |
| textureFactory<sub>readonly</sub> | _TextureFactory_ |
| resizeStrategy | _HTMLElement_ \| `"window"` \| `"fullscreen"` \| `(display) => {width, height}` |
| width | _number_ (_CSS_ pixels) |
| height | _number_ (_CSS_ pixels) |
| now | _number_ (current time in seconds) |
| lastNow | _number_ (the time in seconds from the last animation frame) |
| deltaTime | _number_ (the time in seconds that has elapsed since the last animation frame) |
| frameNo | _number_ (current frame number &mdash; starts at 0) |
| autoClear | _boolean_ (defines whether the renderer should automatically clear its output before rendering a frame) |
| clearColor<sub>readonly</sub> | _THREE.Color_ |
| goFullscreenOnDeviceRotate  | _boolean_ |
| stage | _Stage2D_ \| `undefined` &mdash; _IMPORTANT_: the stage is automatically connected to all display events |
| pixelRatio<sub>readonly</sub> | _number_ |
| pause | _boolean_ |

## Methods

| method | description |
|-|-|
| start() | start the main render loop |
| stop() | stop the main render loop |
| resize() | read out the canvas size (normally you don't need to call this yourself) |
| renderFrame(now) | render a frame (normally you don't need to call this yourself) |
| setClearColor(color) | set the clear color |

## Events

| event | arg | description |
|-|-|-|
| init | `{display, width, height, stage}` | is called _every time_ after start() |
| resize | `{display, width, height, stage}` | is called _every time_ the canvas size changes &mdash; and initially before the first _frame_ event |
| frame | `{display, width, height, stage, now, deltaTime, frameNo}` | called on every animation frame, after clearing the render buffer &mdash; unless _autoClear_ is disabled or _pause_ is activated |

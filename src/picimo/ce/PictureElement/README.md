# `<pi-picture>` Element

## Description

The `<pi-picture>` tag defines an 2d image in a *picimo* canvas.

The image is rendered using a quad grid mesh.

The `<pi-picture>` tag has two required attribute: `display-position` and `texture`.

With the optional attributes `mesh-cols` and `mesh-rows` the grid can be adjusted.

## Attributes

### `mesh-cols`

Set how many quads a column of the internal mesh grid should have.

Default is `16`

### `mesh-rows`

Set how many quads a row of the internal mesh grid should have.

Default is `16`

### `texture`

Sets a reference to the texture for the image.

| Attribute | Value | Description |
|-----------|-------|-------------|
| src | *css query selector* | Specifies the texture element which should be used for the image |
| frame | *frame name* | *Optional.* Specifies the texture frame. Works only when the `src` selector references a `<pi-texture-atlas>` element. |


### `display-position`

Defines the *position (x, y, z)* and *size (width, height)* of the image.

![picture display-position](../../../../doc/images/picture%20display-position.png)

#### Attributes

| Attribute | Value | Units | Description |
|-----------|-------|-------|-------------|
| objectFit | `fill`, `contain`, `cover` | | Specifies how the image should be resized to fit its container box, which is defined by `top`, `left`, `bottom`, `right`, `width` and `height` or the *view* size |
| width | `100vw` | `%`, `px`, `dpx`, `vw`, `vh` | Sets the width of the image container |
| height | `100vh` | `%`, `px`, `dpx`, `vw`, `vh` | Sets the height of the image container |
| top | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the top edge of the image container |
| right | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the right edge of the image contianer |
| bottom | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the bottom edge of the image container |
| left | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the left edge of the image container |

## Example

```html
  <pi-picture
    mesh-cols="128"
    mesh-rows="128"
    texture="src: #atlas0; frame: numbers32_07"
    display-position="top: 10%; bottom: 10%; objectFit: contain"
    ></pi-picture>
```

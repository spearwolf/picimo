# `<pi-picture>`

## Description

The `<pi-picture>` tag defines an 2d image in a *picimo* canvas.

The image is rendered using a quad grid mesh.

The `<pi-picture>` tag has two required attribute: `display-position` and `texture`.

With the *optional* attributes `mesh-cols` and `mesh-rows` the grid can be adjusted.

## Attributes

### `mesh-cols`

Sets how many quads a column of the internal mesh grid should have.

A *static* attribute. Initially read out only once when the mesh is generated.

Default value is `16`


### `mesh-rows`

Sets how many quads a row of the internal mesh grid should have.

A *static* attribute. Initially read out only once when the mesh is generated.

Default value is `16`


### `texture`

Sets a reference to the texture for the image.

A *dynamic* attribute. Is read out every time during the *renderFrame* event.

| Attribute | Value | Description |
|-----------|-------|-------------|
| __src__ | *css query selector* | Specifies the texture element which should be used for the image |
| __frame__ | *frame name* | *Optional.* Specifies the texture frame. Works only when the `src` selector references a *texture atlas*. |


### `display-position`

Defines the *position (x, y, z)* and *size (width, height)* of the image.

![picture display-position](../../../../doc/images/picture%20display-position.png)

A *dynamic* attribute. Is read out every time during the *renderFrame* event.

#### Attributes for `display-position`

| Attribute | Value | Units | Description |
|-----------|-------|-------|-------------|
| __objectFit__ | `fill`, `contain`, `cover` | | Specifies how the image should be resized to fit its container box, which is defined by `top`, `left`, `bottom`, `right`, `width` and `height` or the *view* size |
| __width__ | `100vw` | `%`, `px`, `dpx`, `vw`, `vh` | Sets the width of the image container |
| __height__ | `100vh` | `%`, `px`, `dpx`, `vw`, `vh` | Sets the height of the image container |
| __top__ | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the top edge of the image container |
| __right__ | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the right edge of the image contianer |
| __bottom__ | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the bottom edge of the image container |
| __left__ | | `%`, `px`, `dpx`, `vw`, `vh` | Sets the left edge of the image container |


## Example

```html
  <pi-picture
    mesh-cols="128"
    mesh-rows="128"
    texture="src: #atlas0; frame: numbers32_07"
    display-position="top: 10%; bottom: 10%; objectFit: contain"
    ></pi-picture>
```

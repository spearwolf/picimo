# About Sprites and Vertex Objects

One of the main features of this library is the ability to create and display [sprites](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)).

These can be, for example, simple images that are positioned in the scene with 2d coordinates or much more complex objects with various properties that can be defined completely freely up to complete 3d models (&rarr; geometry instancing).

Most sprite libraries have predefined properties for a sprite, e.g: *texture*, *position*, *rotation*, *opacity*, *tint*
... and have defined a static rendering pipeline that uses these properties to represent the sprites.

[picimo](/spearwolf/picimo/tree/master/packages/picimo) goes one step further and leaves it to the developer *which properties a sprite can have* and *how these properties influence the display*.

The rendering of sprites is done in three steps:
1. Defining the properties of a sprite
2. Creating sprites
3. Display of sprites using freely defined shaders

## Define the properties of a sprite

For picimo a sprite is an object that consists of one or more vertices.
The *Vertex Object Descriptor* (&rarr; `VODescriptor`) structure describes how many vertices there are and what properties and methods they have.

Let's start with a simple example:

```js
import {VODescriptor} from 'picimo';

const baseDescriptor = new VODescriptor({

  vertexCount: 4,  // our sprite should have 4x vertices
                   // yeah, you're right - that's a rectangle 😉

  attributes: {

    position: ['x', 'y', 'z'],  // each vertex has a position property
                                // which consists of the coordinates x, y and z

    opacity: {
      size: 1  // we don't have scalars here, just a single float value
    },
  },
});

```

If you're wondering about *attributes*: *attribute* and *property* are used here as synonyms for the same thing!

Picimo makes *sprite instancing* very easy: you simply define another descriptor that defines the properties of an instance.

```js
import {VODescriptor, hexCol2rgba} from 'picimo';

const instanceDescriptor = new VODescriptor({

  // vertexCount: 1 is the default - in this case it means: for each instance

  attributes: {

    translate: ['tx', 'ty', 'tz'],

    tint: {
      type: 'uint8',  // by default, the data type of a property is float32
                      // in this case we want something different

      scalars: ['r', 'g', 'b', 'a']
    },
  },

  methods: {

    setColor(hexCol) {
      this.setTint(...hexCol2rgba(hexCol));
    },

  },
});

```

Now that we've defined the properties of our sprites, we can create and use some of them right away ...

## Create Sprites

Usually you don't want to create just one sprite but several. For this reason, you can only create a *group of sprites* based on the *vertex object description*.

```js
import {SpriteGroup, VOIndices} from 'picimo';

const spriteGroup = new SpriteGroup(baseDescriptor, {

  capacity: 1000,  // allow a maximum of 1000 sprites in this group

  indices: VOIndices.buildQuads,  // use an index based quad (2x trianlges) render call

  dynamic: false,  // we don't want automatic upload of vertex data to gpu on each frame

});

```

*TODO*





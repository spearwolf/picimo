import VODescriptor from '../v_o_descriptor'

export const simple = new VODescriptor({
  proto: {
    /**
     * @param {Viewport} viewport
     * @param {number} textureWidth
     * @param {number} textureHeight
     * @param {number} [repeat] - texture repeat factor
     */
    setTexCoordsByViewport (viewport, textureWidth, textureHeight, repeat) {
      let x0 = viewport.x === 0 ? 0 : (viewport.x / textureWidth)
      let x1 = (viewport.x + viewport.width) / textureWidth
      let y0 = 1 - (viewport.y + viewport.height) / textureHeight
      let y1 = viewport.y === 0 ? 1 : 1 - (viewport.y / textureHeight)

      if (repeat !== undefined) {
        x0 *= repeat
        x1 *= repeat
        y0 *= repeat
        y1 *= repeat
      }

      this.setTexCoords(x0, y0, x1, y0, x1, y1, x0, y1)
    },

    /**
     * @param {number} width
     * @param {number} height
     */
    setSize (width, height) {
      const halfWidth = width * 0.5
      const halfHeight = (height == null ? width : height) * 0.5

      this.setPos2d(
        -halfWidth, halfHeight,
        halfWidth, halfHeight,
        halfWidth, -halfHeight,
        -halfWidth, -halfHeight
      )
    },

    get rotateDegree () {
      return this.rotate * 180.0 / Math.PI
    },

    set rotateDegree (degree) {
      this.rotate = degree * (Math.PI / 180.0)
    },

    get z () {
      return this.z0
    },

    set z (z) {
      this.z0 = z
      this.z1 = z
      this.z2 = z
      this.z3 = z
    }
  },

  vertexCount: 4,

  // +-+-+-+-+ +-+-+-+-+ +-+-+-+-+
  // |0|1|2|3| |4|5|6|7| |8|9|A|B|
  // +-+-+-+-+ +-+-+-+-+ +-+-+-+-+
  //
  // |o-o-o|                       (3) position: x,y,z
  //       |o|                     (1) rotate
  //           |o-o|               (2) tex-coords: s, t
  //               |o-o|           (3) translate: tx, ty
  //                     |o|       (1) scale
  //                       |o|     (1) opacity
  //

  attributes: [
    { name: 'position', type: 'float32', size: 3, attrNames: [ 'x', 'y', 'z' ] },
    { name: 'rotate', type: 'float32', size: 1, uniform: true },
    { name: 'texCoords', type: 'float32', size: 2, attrNames: [ 's', 't' ] },
    { name: 'translate', type: 'float32', size: 2, attrNames: [ 'tx', 'ty' ], uniform: true },
    { name: 'scale', type: 'float32', size: 1, uniform: true },
    { name: 'opacity', type: 'float32', size: 1, uniform: true }
  ],

  aliases: {
    pos2d: { size: 2, type: 'float32', offset: 0 },
    posZ: { size: 1, type: 'float32', offset: 2, uniform: true },
    uv: 'texCoords'
  }
})

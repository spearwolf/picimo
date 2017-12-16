import rotate from 'picimo/utils/shader_helpers/rotate'

/** @private */
export const vertexShader = [`

  attribute vec2 pos2d;
  attribute float posZ;
  attribute vec2 uv;
  attribute vec2 translate;
  attribute float rotate;
  attribute float scale;
  attribute float opacity;

  uniform mat4 viewMatrix;

  varying vec4 vTextureCoordScaleOpacity;

  `, rotate('rotateZ', 0.0, 0.0, 1.0), `

  void main(void)
  {
    mat4 rotationMatrix = rotateZ(rotate);
    gl_Position = viewMatrix * ((rotationMatrix * (vec4(scale, scale, scale, 1.0) * vec4(pos2d.xy, posZ, 1.0))) + vec4(translate.xy, 0.0, 0.0));
    vTextureCoordScaleOpacity = vec4(uv.xy, opacity, 0.0);
  }
`]

/** @private */
export const fragmentShader = `

  precision mediump float;

  varying vec4 vTextureCoordScaleOpacity;
  uniform sampler2D tex;

  void main(void) {
    gl_FragColor = vTextureCoordScaleOpacity.z * texture2D(tex, vec2(vTextureCoordScaleOpacity.s, vTextureCoordScaleOpacity.t));
  }

`

/** @private */
export const description = {
  vertexCount: 4,

  // +-+-+-+-+ +-+-+-+-+ +-+-+
  // |0|1|2|3| |4|5|6|7| |8|9|
  // +-+-+-+-+ +-+-+-+-+ +-+-+
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
  },

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
     * @param {Texture} texture
     */
    setTexCoordsByTexture (texture) {
      const x0 = texture.minS
      const y0 = texture.minT
      const x1 = texture.maxS
      const y1 = texture.maxT

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

    get width () {
      return this.x1 - this.x3
    },

    get height () {
      return this.y0 - this.y2
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
  }
}

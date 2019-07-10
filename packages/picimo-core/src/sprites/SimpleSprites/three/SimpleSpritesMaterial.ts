import * as THREE from 'three';

const vertexShader = `

  attribute vec4 pos;
  attribute vec4 tex;

  attribute float y;

  varying vec2 vTexCoords;

  void main(void)
  {
    vec4 v = vec4(
      pos.x + (position.x * pos.z),
      y,
      pos.y + (position.y * pos.w),
      1.0);

    gl_Position = projectionMatrix * modelViewMatrix * v;

    vTexCoords = vec2(tex.x + (uv.x * tex.z), tex.y + (uv.y * tex.w));
  }

`;

const fragmentShader = `

  uniform sampler2D texture;

  varying vec2 vTexCoords;

  void main(void) {
    gl_FragColor = texture2D(texture, vec2(vTexCoords.s, vTexCoords.t));

    if (gl_FragColor.a == 0.0) {
      discard;
    }
  }

`;

export class SimpleSpritesMaterial extends THREE.ShaderMaterial {

  constructor(texture: THREE.Texture) {
    super({

      vertexShader,
      fragmentShader,

      uniforms: {

        texture: {
          value: texture,
        },

      },

      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: true,

    });
  }

}

import {Texture, NearestFilter, ShaderMaterial, DoubleSide} from 'three';
import {TextureAtlas} from '../../../textures';

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

function makeTexture(htmlElement: HTMLImageElement) {

  const texture = new Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

export class SimpleSpritesMaterial extends ShaderMaterial {

  private _textureAtlas: TextureAtlas;

  constructor(texture?: THREE.Texture) {
    super({

      vertexShader,
      fragmentShader,

      uniforms: {

        texture: {
          value: texture,
        },

      },

      side: DoubleSide,
      transparent: true,
      depthWrite: true,

    });
  }

  get texture(): Texture {
    return this.uniforms.texture.value;
  }

  set texture(tex: Texture) {
    this.uniforms.texture.value = tex;
  }

  get textureAtlas() {
    return this._textureAtlas;
  }

  set textureAtlas(ta: TextureAtlas) {
    this._textureAtlas = ta;
    if (ta) {
      const {texture: prevTexture} = this;
      prevTexture?.dispose();
      this.texture = makeTexture(ta.baseTexture.imgEl as HTMLImageElement);
    }
  }

}

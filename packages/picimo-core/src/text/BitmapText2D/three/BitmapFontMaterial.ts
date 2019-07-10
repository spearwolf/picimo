import * as THREE from 'three';

const VERTEX_SHADER_PRE_HOOK = '// VERTEX_SHADER_PRE_HOOK';
const VERTEX_SHADER_TRANSFORM_HOOK = '// VERTEX_SHADER_TRANSFORM_HOOK';

const vertexShader = `

  uniform float time;

  attribute vec4 pos;
  attribute vec4 tex;

  attribute float zPos;
  attribute float baselineOffset;

  varying vec2 vTexCoords;

  ${VERTEX_SHADER_PRE_HOOK}

  void main(void)
  {
    vec4 p = vec4(pos.x + (position.x * pos.z), pos.y + (position.y * pos.w) + baselineOffset, zPos, 1.0);

    ${VERTEX_SHADER_TRANSFORM_HOOK}

    gl_Position = projectionMatrix * modelViewMatrix * p;

    vTexCoords = vec2(tex.x + (uv.x * tex.z), tex.y + (uv.y * tex.w));
  }

`;

const fragmentShader = `

  uniform sampler2D fontTexture;

  varying vec2 vTexCoords;

  void main(void) {
    gl_FragColor = texture2D(fontTexture, vec2(vTexCoords.s, vTexCoords.t));

    if (gl_FragColor.a == 0.0) {
      discard;
    }
  }

`;

export interface BitmapFontShaderHooks {

  vertexShaderPreHook?: string;

  vertexShaderTransformHook?: string;

}

const makeVertexShader = (hooks?: BitmapFontShaderHooks) => {

  if (hooks) {

    const vs = vertexShader.replace(VERTEX_SHADER_PRE_HOOK, hooks.vertexShaderPreHook || '');
    return vs.replace(VERTEX_SHADER_TRANSFORM_HOOK, hooks.vertexShaderTransformHook || '');

  }

  return vertexShader;

}

export class BitmapFontMaterial extends THREE.ShaderMaterial {

  constructor(fontTexture: THREE.Texture, shaderHooks?: BitmapFontShaderHooks) {
    super({

      vertexShader: makeVertexShader(shaderHooks),
      fragmentShader,

      uniforms: {

        time: {
          value: 0.0,
        },

        fontTexture: {
          value: fontTexture,
        },

      },

      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: true,

    });
  }

}

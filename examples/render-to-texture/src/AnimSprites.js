/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  SpriteGroupBufferGeometry,
  SpriteGroupMesh,
  SpriteGroupTextured,
  VODescriptor,
  VOIndices,
} from 'picimo';
import {ShaderMaterial, DoubleSide} from 'three';

// ----------------------------------------------------------------------------------
//
// vertex object descriptor
//
// ----------------------------------------------------------------------------------

const makeQuadsDescriptor = () =>
  new VODescriptor({
    vertexCount: 4,

    attributes: {
      position: ['x', 'y', 'z'],
      uv: ['s', 't'],
    },

    methods: {
      translate(x, y, z = 0) {
        this.x0 += x;
        this.x1 += x;
        this.x2 += x;
        this.x3 += x;
        this.y0 += y;
        this.y1 += y;
        this.y2 += y;
        this.y3 += y;
        this.z0 += z;
        this.z1 += z;
        this.z2 += z;
        this.z3 += z;
      },

      setTexCoordsByTexture({minS, minT, maxS, maxT}) {
        this.setUv(minS, minT, maxS, minT, maxS, maxT, minS, maxT);
      },

      setSize(w, h) {
        const w2 = w / 2;
        const h2 = h / 2;
        this.setPosition(-w2, h2, 0, w2, h2, 0, w2, -h2, 0, -w2, -h2, 0);
      },
    },
  });

// ----------------------------------------------------------------------------------
//
// sprite group
//
// ----------------------------------------------------------------------------------

const makeSpriteGroup = ({capacity}) =>
  new SpriteGroupTextured(makeQuadsDescriptor(), {
    capacity,
    dynamic: true,
    autotouch: true,
    indices: VOIndices.buildQuads,
    setSize: (sprite, w, h) => sprite.setSize(w, h),
    setTexCoordsByTexture: (sprite, texture) =>
      sprite.setTexCoordsByTexture(texture),
  });

// ----------------------------------------------------------------------------------
//
// AnimSprites
//
// ----------------------------------------------------------------------------------

export class AnimSprites extends SpriteGroupMesh {
  constructor({capacity}) {
    const sprites = makeSpriteGroup({capacity});
    super(new SpriteGroupBufferGeometry(sprites));

    this.sprites = sprites;
    this.frustumCulled = false;
    this.timeUniform = {value: 0.0};
  }

  createMaterial(tileset, textureFactory) {
    this.material = new ShaderMaterial({
      vertexShader: `
        uniform float time;

        varying vec2 vTexCoords;

        void main(void) {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y + (150.0 * sin((3.0 * time) + (position.x / 300.0) + (position.z / 200.0))), position.z, 1.0);
          vTexCoords = uv;
        }
      `,

      fragmentShader: `
        uniform sampler2D tex;

        varying vec2 vTexCoords;

        void main(void) {
          gl_FragColor = texture2D(tex, vec2(vTexCoords.s, vTexCoords.t));

          if (gl_FragColor.a == 0.0) {
            discard;
          }
        }
      `,

      uniforms: {
        time: this.timeUniform,
        tex: {
          value: textureFactory.create(tileset, 'anisotrophy'),
        },
      },

      side: DoubleSide,
      transparent: true,
      depthWrite: true,
    });
  }
}

/*
// ----------------------------------------------------------------------------------
//
// load texture atlas
//
// ----------------------------------------------------------------------------------

const atlas = await TextureAtlas.load('nobinger.json', '/assets/');

atlas.frameNames().forEach((name) => {
  const tex = atlas.frame(name);
  atlas.addTexture(`${name}--horizontal`, tex.clone().flipHorizontal());
  atlas.addTexture(`${name}--vertical`, tex.clone().flipVertical());
  atlas.addTexture(
    `${name}--horizontal-vertical`,
    tex.clone().flipHorizontal().flipVertical(),
  );
});

// ----------------------------------------------------------------------------------
//
// create custom shader material
//
// ----------------------------------------------------------------------------------

const material = new ShaderMaterial({
  vertexShader: `
      uniform float time;

      varying vec2 vTexCoords;

      void main(void)
      {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y + (150.0 * sin((3.0 * time) + (position.x / 300.0) + (position.z / 200.0))), position.z, 1.0);
        vTexCoords = uv;
      }
    `,

  fragmentShader: `
      uniform sampler2D tex;

      varying vec2 vTexCoords;

      void main(void) {
        gl_FragColor = texture2D(tex, vec2(vTexCoords.s, vTexCoords.t));

        if (gl_FragColor.a == 0.0) {
          discard;
        }
      }
    `,

  uniforms: {
    time: timeUniform,
    tex: {
      value: display.textureFactory.makeThreeTexture(atlas, {
        anisotrophy: Infinity,
      }),
    },
  },

  side: DoubleSide,
  transparent: true,

  depthWrite: true,
});

const spriteGroupGeometry = new SpriteGroupBufferGeometry(spriteGroup);
const mesh = new SpriteGroupMesh(spriteGroupGeometry, material);
*/

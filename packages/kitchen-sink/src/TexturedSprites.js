/* eslint-env browser */
import {
  VODescriptor,
  VOIndices,
  SpriteGroupTextured,
  SpriteGroupBufferGeometry,
  SpriteGroupMesh,
  TextureAtlas,
} from 'picimo';
import * as THREE from 'three';

import {debug} from './utils/debug';
import {makeExampleShell} from './utils/makeExampleShell';

const init = async ({display, scene}) => {
  // ----------------------------------------------------------------------------------
  //
  // create vertex object descriptor
  //
  // ----------------------------------------------------------------------------------

  const quads = new VODescriptor({
    vertexCount: 4,

    attributes: {
      position: ['x', 'y', 'z'],
      uv: ['s', 't'],
    },

    methods: {
      translate(x, y, z) {
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

      setTexCoordsByTexture({minS, minT, maxS, maxT}, flipXY = false) {
        if (flipXY) {
          this.setUv(minS, maxT, minS, minT, maxS, minT, maxS, maxT);
        } else {
          this.setUv(minS, minT, maxS, minT, maxS, maxT, minS, maxT);
        }
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
  // create sprite group
  //
  // ----------------------------------------------------------------------------------

  const spriteGroup = new SpriteGroupTextured(quads, {
    capacity: 1000,

    indices: VOIndices.buildQuads,

    dynamic: false,

    setSize: (sprite, w, h) => sprite.setSize(w, h),
    setTexCoordsByTexture: (sprite, texture) =>
      sprite.setTexCoordsByTexture(texture, Math.random() < 0.5),
  });

  // ----------------------------------------------------------------------------------
  //
  // create some custom uniforms
  //
  // ----------------------------------------------------------------------------------

  const timeUniform = {value: 0.0};

  display.on('frame', ({now}) => {
    timeUniform.value = ((0.5 * now) % Math.PI) * 2;
  });

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
  // create some sprites
  //
  // ----------------------------------------------------------------------------------

  const COUNT = 40;
  const STEP_X = 60;
  const LAYERS = 11;
  const STEP_Z = 100;

  for (let z = -0.5 * LAYERS * STEP_Z, j = 0; j < LAYERS; j++, z += STEP_Z) {
    for (let x = -0.5 * COUNT * STEP_X, i = 0; i < COUNT; i++, x += STEP_X) {
      spriteGroup
        .createSpriteFromTexture(atlas.randomFrame())
        .translate(x, 0, z);
    }
  }

  // ----------------------------------------------------------------------------------
  //
  // create custom shader material
  //
  // ----------------------------------------------------------------------------------

  const material = new THREE.ShaderMaterial({
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
        value: display.textureFactory.create(atlas, 'nearest', 'anisotrophy'),
      },
    },

    side: THREE.DoubleSide,
    transparent: true,

    depthWrite: true,
  });

  // ----------------------------------------------------------------------------------
  //
  // add sprites to scene
  //
  // ----------------------------------------------------------------------------------

  const spriteGroupGeometry = new SpriteGroupBufferGeometry(spriteGroup);
  const mesh = new SpriteGroupMesh(spriteGroupGeometry, material);

  scene.add(mesh);

  debug('spriteGroup', spriteGroup);
  debug('material', material);
};

// ----------------------------------------------------------------------------------
//
// startup
//
// ----------------------------------------------------------------------------------

makeExampleShell(
  document.getElementById('container'),
  {
    mode: 'pixelated',
  },
  init,
);

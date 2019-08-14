/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';

import { makeExampleShell } from './utils/makeExampleShell';
import { debug } from './utils/debug';

import {
  hexCol2rgba,
  makeCircleCoords,
  sample,
  ShaderTool,
  SpriteGroup,
  SpriteGroupInstancedBufferGeometry,
  SpriteGroupMesh,
  VODescriptor,
  VOIndices,
} from '../../src';

const init = async ({ display, scene }) => {

  // ----------------------------------------------------------------------------------
  //
  // create vertex object descriptors
  //
  // ----------------------------------------------------------------------------------

  const baseQuadsDescriptor = new VODescriptor({

    vertexCount: 4,

    attributes: {

      position: ['x', 'y', 'z'],

    },

  });

  const instancedQuadsDescriptor = new VODescriptor({

    attributes: {

      translate: ['tx', 'ty', 'tz'],

      rgba: { type: 'uint8', scalars: ['r', 'g', 'b', 'a'] }

    },

  });

  // ----------------------------------------------------------------------------------
  //
  // create sprite groups
  //
  // ----------------------------------------------------------------------------------

  const baseSpriteGroup = new SpriteGroup(baseQuadsDescriptor, {

    capacity: 1000,
    maxAllocVOSize: 100,

    indices: VOIndices.buildQuads,

    dynamic: false,

  });

  const spriteGroup = new SpriteGroup(instancedQuadsDescriptor, {

    capacity: 1000,
    maxAllocVOSize: 100,

    dynamic: false,

  });

  // ----------------------------------------------------------------------------------
  //
  // create some sprites
  //
  // ----------------------------------------------------------------------------------

  // === base sprites === == -----

  const DX = 40;
  const DY = 110;

  baseSpriteGroup.createSprite().setPosition(
    -DX, 0, DY,
    DX, 0, DY,
    DX, 0, -DY,
    -DX, 0, -DY,
  );

  // === instanced sprites === == -----

  const COLORS = [
    '3ec1d3',
    'f6f7d7',
    'ff9a00',
    'ff165d',
  ];

  makeCircleCoords(100, 1000).forEach(([x, y]) => {
    const quad = spriteGroup.createSprite();
    quad.setTranslate(x, y, 0);
    quad.setRgba(...hexCol2rgba(sample(COLORS), 180));
  });

  // ----------------------------------------------------------------------------------
  //
  // create some custom uniforms
  //
  // ----------------------------------------------------------------------------------

  const timeUniform = { value: 0.0 };

  display.addEventListener('frame', ({ now }) => {

    timeUniform.value = 0.5 * now % Math.PI * 2;

  });

  // ----------------------------------------------------------------------------------
  //
  // create custom shader material
  //
  // ----------------------------------------------------------------------------------

  const material = new THREE.ShaderMaterial({

    vertexShader: `
      attribute vec3 translate;
      attribute vec4 rgba;

      uniform float time;

      varying vec4 vColor;

      ${ShaderTool.rotate('rot', 0.0, 1.0, 0.0)}

      void main(void)
      {
        mat4 rotation = rot(time);
        gl_Position = projectionMatrix * modelViewMatrix * (vec4(translate, 1.0) + (rotation * vec4(position, 1.0)));
        vColor = rgba / 255.0;
      }
    `,

    fragmentShader: `
      varying vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;

        if (gl_FragColor.a == 0.0) {
          discard;
        }
      }
    `,

    uniforms: {
      time: timeUniform,
    },

    side: THREE.DoubleSide,
    transparent: true,

    depthWrite: false,
    blending: THREE.AdditiveBlending,

  });

  // ----------------------------------------------------------------------------------
  //
  // add sprites to scene
  //
  // ----------------------------------------------------------------------------------

  const geometry = new SpriteGroupInstancedBufferGeometry(baseSpriteGroup, spriteGroup);
  const mesh = new SpriteGroupMesh(geometry, material);

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
    alpha: true,
  },
  init,
);

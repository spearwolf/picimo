/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';

import { makeExampleShell } from './utils/makeExampleShell';
import { debug } from './utils/debug';

import {
  makeCircleCoords,
  SpriteGroup,
  SpriteGroupInstancedBufferGeometry,
  SpriteGroupMesh,
  VODescriptor,
  hexCol2rgb,
  sample,
} from '../../src';

const init = async ({ display, scene }) => {

  // ----------------------------------------------------------------------------------
  //
  // create lights
  //
  // ----------------------------------------------------------------------------------

  const ambientLight = new THREE.AmbientLight(0xffffa0);
  scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight(0xf0f0f0, 0xff0066, 1);
  scene.add(hemisphereLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 0, 1000);
  scene.add(directionalLight);

  // ----------------------------------------------------------------------------------
  //
  // create vertex object descriptor
  //
  // ----------------------------------------------------------------------------------

  const vod = new VODescriptor({

    attributes: {

      move: ['x', 'y', 'z'],

      tint: { type: 'uint8', scalars: ['r', 'g', 'b'] },

    },

    methods: {

      setColor(color) {
        const colors = hexCol2rgb(color);
        this.setTint(...colors);
      }

    },

  });

  // ----------------------------------------------------------------------------------
  //
  // create sprite groups
  //
  // ----------------------------------------------------------------------------------

  const spriteGroup = new SpriteGroup(vod, {

    capacity: 1000,

    dynamic: false,

  });

  // ----------------------------------------------------------------------------------
  //
  // create some sprites
  //
  // ----------------------------------------------------------------------------------

  const COLORS = [
    'b7fbff',
    'fff6be',
    'ffe0a3',
    'ffa1ac',
  ];

  for (let i = 0; i < 10; i++) {

    makeCircleCoords(100, 650 - (i * 50), (x, y, z) => {
      const sprite = spriteGroup.createSprite();
      sprite.setMove(x, y, (z + (i * 0.05)));
      sprite.setColor(sample(COLORS));
    });

  }

  console.log('Created', spriteGroup.usedCount, 'sprites');

  // ----------------------------------------------------------------------------------
  //
  // create some custom uniforms
  //
  // ----------------------------------------------------------------------------------

  const timeUniform = { value: 0.0 };

  display.addEventListener('frame', ({ now }) => {

    timeUniform.value = (now * 0.5) % Math.PI * 2;

  });

  // ----------------------------------------------------------------------------------
  //
  // create base geometry
  //
  // ----------------------------------------------------------------------------------

  const baseGeometry = new THREE.SphereBufferGeometry(12, 16, 16);

  const material = new THREE.MeshLambertMaterial();

  // @ts-ignore
  material.onBeforeCompile = (shader) => {

    shader.uniforms.time = timeUniform;

    shader.vertexShader = `
      attribute vec3 move;
      attribute vec3 tint;

      uniform float time;

      varying vec3 vTint;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        vec3 transformed = vec3( position + vec3( move.xy, 150.0 * cos(time + ( move.z * ${Math.PI * 4}) ) - 75.0) );

        vTint = tint / 255.0;
      `,
    );

    shader.fragmentShader = `
      varying vec3 vTint;
      ${shader.fragmentShader}
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
        gl_FragColor.rgb *= vTint;
        #include <dithering_fragment>
      `,
    );

  };

  // ----------------------------------------------------------------------------------
  //
  // add sprites to scene
  //
  // ----------------------------------------------------------------------------------

  const geometry = new SpriteGroupInstancedBufferGeometry(baseGeometry, spriteGroup);
  const mesh = new SpriteGroupMesh(geometry, material);

  scene.add(mesh);

  display.addEventListener('frame', ({ deltaTime }) => {

    mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), deltaTime);

  });

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

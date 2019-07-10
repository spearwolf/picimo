/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';

import { makeWireframe } from './utils/makeWireframe';
import { debug } from './utils/debug';

import { Display, VODescriptor, VOIndices, SpriteGroup, SpriteGroupBufferGeometry, SpriteGroupMesh } from '../../src';

const display = new Display(document.getElementById('container'), {
  alpha: false,
  clearColor: 'skyblue',
});

const camera = new THREE.PerspectiveCamera(75, display.width / display.height, 0.1, 100);
camera.position.z = 30;
camera.position.y = 10;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const triangleDescriptor = new VODescriptor({

  vertexCount: 3,

  attributes: [{
      name: 'position', scalars: ['x', 'y', 'z'],
  }],

});

const spriteGroup = new SpriteGroup(triangleDescriptor, {

  capacity: 10,

  indices: VOIndices.buildTriangles,

  dynamic: true,
  autotouch: true,

});

const [s0, s1, s2] = spriteGroup.createSprites(3);

s0.setPosition(
  -6, 0, 0,
  0, 6, 0,
  6, 0, 0,
);

s1.setPosition(
  -9, -1, 0,
  0, -7, 0,
  9, -1, 0,
);

s2.setPosition(
  0, -5, -7,
  0, 1, 0,
  0, -5, 7,
);

const spriteGroupGeometry = new SpriteGroupBufferGeometry(spriteGroup);

const mesh = new SpriteGroupMesh(spriteGroupGeometry, new THREE.MeshBasicMaterial({
  color: 0xff0044,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.666,
}));

scene.add(mesh);

const cube = makeWireframe(new THREE.BoxBufferGeometry(10, 10, 10), 0xffffe5);
scene.add(cube);

const yAxis = new THREE.Vector3(0, 1, 0);

display.addEventListener('frame', ({ display, width, height, deltaTime }) => {

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  scene.rotateOnAxis(yAxis, deltaTime);

  display.renderer.render(scene, camera);

});

display.start();

debug('display', display);
debug('cube', cube);
debug('triangleDescriptor', triangleDescriptor);
debug('spriteGroup', spriteGroup);
debug('spriteGroupGeometry', spriteGroupGeometry);
debug('mesh', mesh);
debug('s0', s0);
debug('s1', s1);

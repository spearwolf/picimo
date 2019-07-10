/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { makeWireframe } from './makeWireframe';
import { debug } from './debug';

import { Display, readOption } from '../../../src';

export const makeExampleShell = async (el, options, initializer) => {

  const display = new Display(el, {
    ...options,
    pixelate: true,
  });

  debug('display', display);

  const camera = new THREE.PerspectiveCamera(75, display.width / display.height, 0.1, 10000);
  camera.position.z = 500;
  camera.position.y = 300;
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  if (readOption(options, 'showCube', true)) {

    scene.add(makeWireframe(new THREE.BoxBufferGeometry(100, 100, 100), 0xffffff));

  }

  const orbit = new OrbitControls(camera, display.renderer.domElement);

  orbit.screenSpacePanning = true;

  orbit.enableDamping = true;
  orbit.dampingFactor = 0.25;

  // @ts-ignore
  orbit.autoRotate = Boolean(readOption(options, 'autoRotate', true));
  orbit.autoRotateSpeed = 0.25;

  await initializer({ display, camera, scene, orbit });

  display.addEventListener('frame', ({ display, width, height }) => {

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    orbit.update();

    display.renderer.render(scene, camera);

  });

  display.start();
};

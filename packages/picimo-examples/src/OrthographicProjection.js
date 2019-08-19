/* eslint no-console: 0 */
/* tslint:disable:no-console */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {
  Display,
  Map2D,
  Map2DView,
  Map2DViewFrame,
  Map2DViewLayer,
  RepeatingPatternLayer,
  TileSet,
} from 'picimo';

const display = new Display(document.getElementById('three-container'), { clearColor: 0x0043ff });

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x203040);

const camera3d = new THREE.PerspectiveCamera(75, 1, 1, 10000);
camera3d.position.set(0, 200, 350);
camera3d.up.set(0, 1, 0);

const min = (a, b) => a > b ? b : a;

const [halfWidth, halfHeight] = [display.width / 2, display.height / 2];
console.log(`halfWidth=${halfWidth}, halfHeight=${halfHeight}`);
const cam2dZ = 100;
const camera2d = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, 1, 1000 );
camera2d.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * -0.5));

let curCamera = camera3d;

const controls = new OrbitControls(camera3d);

let view = null;

const SPEED = 200; // pixels per second

let speedNorth = 0;
let speedEast = 0;
let speedSouth = 0;
let speedWest = 0;

display.addEventListener('resize', ({width, height}) => {
  if (view) {
    view.width = width;
    view.height = height;
  }

  const [halfWidth, halfHeight] = [width / 2, height / 2];
  camera2d.left = -halfWidth;
  camera2d.right = halfWidth;
  camera2d.top = halfHeight;
  camera2d.bottom = -halfHeight;
  camera2d.updateProjectionMatrix();

  camera3d.aspect = width / height;
  camera3d.updateProjectionMatrix();
});

display.addEventListener('frame', ({deltaTime: t, display: {renderer}}) => {

  controls.update();

  if (view) {
    view.centerY -= speedNorth * t;
    view.centerY += speedSouth * t;
    view.centerX += speedEast * t;
    view.centerX -= speedWest * t;
    view.update();
  }

  if (curCamera === camera2d) {
    camera2d.position.set(view.centerX, cam2dZ, view.centerY);
  }

  renderer.render(scene, curCamera);

});

// ////////////////////////////////////////////////////

async function init() {

  const map2d = new Map2D();
  console.log('map2d', map2d);

  scene.add(map2d);

  const ball = await TileSet.load('ball-pattern-rot.png', { basePath: '../assets/' });

  view = new Map2DView(map2d, 0, 0, display.width, display.height, 256, 256);

  view.addLayer(
    new Map2DViewLayer(view,
      map2d.createTileQuadMeshLayer([ball]),
      RepeatingPatternLayer.fromTile(ball, 1),
    ));

  const viewFrame = new Map2DViewFrame(map2d, 0x66ff00, .5);
  map2d.add(viewFrame);

  document.addEventListener('keydown', (event) => {
    const { keyCode } = event;
    switch (keyCode) {
    case 87: // W
      speedNorth = SPEED;
      break;
    case 83: // S
      speedSouth = SPEED;
      break;
    case 65: // A
      speedWest = SPEED;
      break;
    case 68: // D
      speedEast = SPEED;
      break;
    }
  });

  // const changeViewSize = (multiplyByScalar) => {
  //   if (view) {
  //     view.width *= multiplyByScalar;
  //     view.height = calcViewHeight(view.width);
  //     const half = min(view.width, view.height) / 2;
  //     camera2d.left = -half;
  //     camera2d.right = half;
  //     camera2d.top = half;
  //     camera2d.bottom = -half;
  //     camera2d.updateProjectionMatrix();
  //   }
  // };

  document.addEventListener('keyup', (event) => {
    const { keyCode } = event;
    switch (keyCode) {
    case 87: // W
      speedNorth = 0;
      break;
    case 83: // A
      speedSouth = 0;
      break;
    case 65: // S
      speedWest = 0;
      break;
    case 68: // D
      speedEast = 0;
      break;
    case 49: // 1
      // @ts-ignore
      curCamera = camera2d;
      viewFrame.visible = false;
      controls.enabled = false;
      break;
    case 50: // 2
      curCamera = camera3d;
      viewFrame.visible = true;
      controls.enabled = true;
      break;
    case 107: // numPad: add
    case 187: // +
      // changeViewSize(curCamera === camera3d ? 1.1 : 0.9);
      break;
    case 109: // numPad: sub
    case 189: // -
      // @ts-ignore
      // changeViewSize(curCamera === camera2d ? 1.1 : 0.9);
      break;
    }
  });
};

init();
display.start();
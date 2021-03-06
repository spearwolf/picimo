/* eslint no-console: 0 */
/* tslint:disable:no-console */
import {
  Display,
  Map2D,
  Map2DPanControl,
  Map2DTileQuadsLayer,
  Map2DView,
  Map2DViewFrame,
  Map2DViewLayer,
  OrthographicProjection,
  Plane,
  RepeatingPatternLayer,
  TileSet,
} from 'picimo';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const display = new Display(document.getElementById('three-container'), {
  clearColor: 0x0043ff,
  alpha: false,
  mode: 'pixelated',
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x206030);

const camera3d = new THREE.PerspectiveCamera(75, 1, 1, 10000);
camera3d.position.set(0, 200, 350);
camera3d.up.set(0, 1, 0);

let curCamera = null; // camera3d;

const projection = new OrthographicProjection(Plane.XZ, {
  pixelZoom: 3,
  near: 0.1,
  far: 1000,
  distance: 100,
});

const controls = new OrbitControls(camera3d, display.canvas);

let viewFrame;

const switchCamera = (camera) => {
  curCamera = camera;
  if (camera === camera3d) {
    if (viewFrame) {
      viewFrame.visible = true;
    }
    controls.enabled = true;
  } else {
    if (viewFrame) {
      viewFrame.visible = false;
    }
    controls.enabled = false;
  }
};

display.on('resize', ({width, height}) => {
  projection.updateViewRect(width, height);

  if (curCamera === null) {
    switchCamera(projection.getCamera());
  }

  camera3d.aspect = width / height;
  camera3d.updateProjectionMatrix();
});

// ////////////////////////////////////////////////////

async function init() {
  const map2d = new Map2D();
  scene.add(map2d);

  const view = new Map2DView(map2d, projection);

  const ball = await TileSet.load('ball-pattern-rot.png', {
    basePath: '../assets/',
  });
  view.addLayer(
    new Map2DViewLayer(
      view,
      Map2DTileQuadsLayer.appendNewLayer(map2d, [ball]),
      RepeatingPatternLayer.fromTile(ball, 1),
    ),
  );

  viewFrame = new Map2DViewFrame(map2d, 0x66ff00, 1);
  map2d.add(viewFrame);

  if (curCamera === projection.getCamera()) {
    viewFrame.visible = false;
  }

  const panControl = new Map2DPanControl(view, projection, {speed: 200});

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
    const {keyCode} = event;
    switch (keyCode) {
      case 49: // 1
        // @ts-ignore
        switchCamera(projection.getCamera());
        break;
      case 50: // 2
        switchCamera(camera3d);
        break;
      case 67: // c
        controls.target.set(view.centerX, 0, view.centerY);
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

  display.on('frame', ({deltaTime: t, display: {renderer}}) => {
    controls.update();

    panControl.update(t);
    view.update();

    renderer.render(scene, curCamera);
  });
}

init();
display.start();

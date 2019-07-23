/* eslint no-console: 0 */
/* tslint:disable:no-console */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MapControls } from 'three/examples/jsm/controls/MapControls';
import Stats from 'stats.js';

import {
  Map2D,
  // Map2DFlat2DTilesLayer,
  Map2DTileQuadsLayer,
  Map2DView,
  Map2DViewFrame,
  Map2DViewLayer,
  // TextureLibrary,
  TiledMap,
  TileQuadMeshCache,
} from '@picimo/core';

const VIEW_WIDTH = 320;
const VIEW_ASPECT = .5; //9 / 16;
const calcViewHeight = (width = VIEW_WIDTH) => Math.round(width * VIEW_ASPECT);

console.log('hej ho 🦄');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x203040);

const camera3d = new THREE.PerspectiveCamera(75, 1, 1, 1000);
camera3d.position.set(0, 200, 350);
camera3d.lookAt(0, 0, 0);
camera3d.up.set(0, 1, 0);

const min = (a, b) => a > b ? b : a;

const halfSize = min(VIEW_WIDTH, calcViewHeight()) / 2;
const cam2dZ = 100;
const camera2d = new THREE.OrthographicCamera(-halfSize, halfSize, halfSize, -halfSize, 1, 1000 );
camera2d.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * -0.5));

let curCamera = camera3d;

const renderer = new THREE.WebGLRenderer({
  antialias: false,
  powerPreference: 'high-performance',
});

// see https://threejs.org/docs/#examples/loaders/GLTFLoader
// renderer.gammaOutput = true;
// renderer.gammaFactor = 2.2;

const DPR = 1; // window.devicePixelRatio || 1;
renderer.setPixelRatio(DPR);

const threeContainerElement = document.getElementById('three-container');
threeContainerElement.appendChild(renderer.domElement);

const infoDisplayElement = document.createElement('div');
infoDisplayElement.setAttribute('class', 'infoDisplay infoText');
threeContainerElement.appendChild(infoDisplayElement);

const controls = new MapControls(camera3d);

const PIXELATE = 'pixelate';

const urlParams = new URLSearchParams(window.location.search);

let lastSizeInfo = null;

function resize() {
  let pixelate = Number(urlParams.get(PIXELATE));
  if (isNaN(pixelate)) {
    pixelate = 1;
  }

  // @ts-ignore
  const { clientWidth, clientHeight } = renderer.domElement.parentNode;
  const minSize = min(clientWidth, clientHeight);
  const size = Math.floor(pixelate > 0 ? (minSize / pixelate) : (minSize * DPR));

  const newSizeInfo = `
    container: ${clientWidth}x${clientHeight}<br>
    canvas: ${size}x${size}<br>
    devicePixelRatio: ${DPR} (${window.devicePixelRatio || 1})<br>
    ?${PIXELATE}=${pixelate}
  `;

  infoDisplayElement.innerHTML = view
    ? `${newSizeInfo.trim()}<br>x=${Math.round(view.centerX)} y=${Math.round(view.centerY)} [${Math.round(view.width)}x${Math.round(view.height)}]`
    : newSizeInfo;

  if (lastSizeInfo !== newSizeInfo) {
    lastSizeInfo = newSizeInfo;

    renderer.setSize(size, size);
    camera3d.aspect = 1;
    curCamera.updateProjectionMatrix();

    renderer.domElement.classList[pixelate !== 0 ? 'add' : 'remove'](PIXELATE);
    renderer.domElement.style.width = `${minSize}px`;
    renderer.domElement.style.height = `${minSize}px`;
    return true;
  }
}

const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

let rendererShouldRender = true;

const SPEED = 130; // pixels per second

let view = null;
let viewFrame = null;

let speedNorth = 0;
let speedEast = 0;
let speedSouth = 0;
let speedWest = 0;

let lastTime = 0;

function render(time) {
  let isResized = resize();

  let t = 0;
  if (lastTime ===  0) {
    lastTime = time / 1000;
  } else {
    const t0 = time / 1000;
    t = t0 - lastTime;
    lastTime = t0;
  }

  rendererShouldRender = rendererShouldRender || 0 < (speedNorth + speedEast + speedSouth + speedWest);
  rendererShouldRender = rendererShouldRender || curCamera === camera3d;

  if (isResized || rendererShouldRender) {
    controls.update();

    if (view) {
      view.centerY -= speedNorth * t;
      view.centerY += speedSouth * t;
      view.centerX += speedEast * t;
      view.centerX -= speedWest * t;
      view.update();

      camera2d.position.set(view.centerX, cam2dZ, view.centerY);
    }
    renderer.render(scene, curCamera);
    rendererShouldRender = false;
  }
}

function animate(time) {
  stats.begin();
  render(time);
  stats.end();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// load tiled map ////////////////////////////////////////////////////

Promise.all([
  // -- 180917-a-first-map.json
  // TiledMap.load('./maps/180917-a-first-map.json'),
  // TextureLibrary.load('sketch-tiles.json', './atlas/'),

  TiledMap.load('./maps/lab-wall-tiles-new-map.json'),
  // TextureLibrary.load('lab-wall-tiles-new.json', './atlas/'),

]).then(async ([tiledMap/*, texLib*/]) => {

  const tileset = (await tiledMap.loadTileSets('./atlas/'))[0];

  console.log('auto-loaded tilesets:', tiledMap.tilesets);

  // const { imgEl } = texLib.atlas.baseTexture;
  const imgEl = tileset.getImageSource();
  const el = document.querySelector('.textureAtlas');
  el.appendChild(imgEl);

  // texLib.setIdNameMap([
  //   [1, 'empty.png'],
  //   [2, 'floor.png'],
  //   [3, 'wall-e.png'],
  //   [4, 'wall-n.png'],
  //   [5, 'wall-ns.png'],
  //   [6, 'wall-s.png'],
  //   [7, 'wall-w.png'],
  //   [8, 'wall-es.png'],
  //   [9, 'wall-esw.png'],
  //   [10, 'wall-ew.png'],
  //   [11, 'wall-ne.png'],
  //   [12, 'wall-nes.png'],
  //   [13, 'wall-nesw.png'],
  //   [14, 'wall-new.png'],
  //   [15, 'wall-nsw.png'],
  //   [16, 'wall-nw.png'],
  //   [17, 'wall-sw.png'],
  // ]);

  // texLib.setIdNameMap([
  //   [1, 'lab-wall-tiles-00.png'],
  //   [2, 'lab-wall-tiles-01.png'],
  //   [3, 'lab-wall-tiles-02.png'],
  //   [4, 'lab-wall-tiles-03.png'],
  //   [5, 'lab-wall-tiles-04.png'],
  //   [6, 'lab-wall-tiles-05.png'],
  //   [7, 'lab-wall-tiles-06.png'],
  //   [8, 'lab-wall-tiles-07.png'],
  //   [9, 'lab-wall-tiles-08.png'],
  //   [10, 'lab-wall-tiles-09.png'],
  //   [11, 'lab-wall-tiles-10.png'],
  //   [12, 'lab-wall-tiles-11.png'],
  //   [13, 'lab-wall-tiles-12.png'],
  //   [14, 'lab-wall-tiles-13.png'],
  //   [15, 'lab-wall-tiles-14.png'],
  //   [16, 'lab-wall-tiles-15.png'],
  //   [17, 'lab-wall-tiles-16.png'],
  //   [18, 'lab-wall-tiles-18.png'],
  // ]);

  // texLib.setDefaultTexture('empty.png');
  // texLib.setDefaultTexture('sketch-dungeon-back-tile.png');
  // console.log('TextureLibrary', texLib);

  const map2d = new Map2D();
  scene.add(map2d);

  // @ts-ignore
  window.map2d = map2d;

  // const flat2dTiles = new Map2DFlat2DTilesLayer(texLib);
  // map2d.appendLayer(flat2dTiles);

  const meshCache = new TileQuadMeshCache();

  const backTileQuads = new Map2DTileQuadsLayer(tiledMap.tilesets, meshCache); // texLib);
  map2d.appendLayer(backTileQuads);

  const frontTileQuads = new Map2DTileQuadsLayer(tiledMap.tilesets, meshCache); // texLib);
  frontTileQuads.getObject3D().position.add(new THREE.Vector3(0, 10, 0));
  map2d.appendLayer(frontTileQuads);

  view = new Map2DView(map2d, 0, 0, VIEW_WIDTH, calcViewHeight(), 100, 100);

  // view.addLayer(new Map2DViewLayer(view, layerMain, tiledMap.getLayer('main')));
  // view.addLayer(new Map2DViewLayer(view, flat2dTiles, tiledMap.getLayer('Kachelebene 1')));
  view.addLayer(new Map2DViewLayer(view, backTileQuads, tiledMap.getLayer('Kachelebene 1')));
  view.addLayer(new Map2DViewLayer(view, frontTileQuads, tiledMap.getLayer('Kachelebene 2')));
  // view.update();

  viewFrame = new Map2DViewFrame(map2d, 0xff0000, 20);
  map2d.add(viewFrame);

  rendererShouldRender = true;

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

  const changeViewSize = (multiplyByScalar) => {
    if (view) {
      view.width *= multiplyByScalar;
      view.height = calcViewHeight(view.width);
      const half = min(view.width, view.height) / 2;
      camera2d.left = -half;
      camera2d.right = half;
      camera2d.top = half;
      camera2d.bottom = -half;
      camera2d.updateProjectionMatrix();
      rendererShouldRender = true;
    }
  };

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
      rendererShouldRender = true;
      break;
    case 50: // 2
      curCamera = camera3d;
      viewFrame.visible = true;
      controls.enabled = true;
      rendererShouldRender = true;
      break;
    case 107: // numPad: add
    case 187: // +
      changeViewSize(curCamera === camera3d ? 1.1 : 0.9);
      break;
    case 109: // numPad: sub
    case 189: // -
      // @ts-ignore
      changeViewSize(curCamera === camera2d ? 1.1 : 0.9);
      break;
    }
  });
});

// ===== load gtlf =/=/============////==================================-------

new GLTFLoader().load('gltf/lab-walls-tiles.glb', (gltf) => {
  console.log('loaded gltf:', gltf);
});

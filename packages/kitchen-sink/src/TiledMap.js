/* eslint no-console: 0 */
/* tslint:disable:no-console */
import {
  Map2D,
  Map2DTileQuadsLayer,
  Map2DView,
  Map2DViewFrame,
  Map2DViewLayer,
  ParallaxProjection,
  RepeatingPatternLayer,
  TiledMap,
  TileSet,
  Plane,
} from 'picimo';
import Stats from 'stats.js';
import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const VIEW_WIDTH = 320;
const VIEW_ASPECT = 0.5; //9 / 16;
const calcViewHeight = (width = VIEW_WIDTH) => Math.round(width * VIEW_ASPECT);

console.log('hej ho 🦄');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x203040);

const camera3d = new THREE.PerspectiveCamera(75, 1, 1, 10000);
camera3d.position.set(0, 200, 350);
camera3d.up.set(0, 1, 0);

const min = (a, b) => (a > b ? b : a);

const projection = new ParallaxProjection(Plane.XZ, {
  pixelZoom: 3,
  distance: 300,
});

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

const controls = new OrbitControls(camera3d, renderer.domElement);

const PIXELATE = 'pixelate';

const urlParams = new URLSearchParams(window.location.search);

let lastSizeInfo = null;
let materialCache = null;

let map2d = null;
let view = null;
let viewFrame = null;

function resize() {
  let pixelate = Number(urlParams.get(PIXELATE));
  if (isNaN(pixelate)) {
    pixelate = 1;
  }

  // @ts-ignore
  const {clientWidth, clientHeight} = renderer.domElement.parentNode;
  const minSize = min(clientWidth, clientHeight);
  const size = Math.floor(pixelate > 0 ? minSize / pixelate : minSize * DPR);

  projection.update(size, size);
  if (view) {
    view.width = projection.width;
    view.height = projection.height;
  }

  const newSizeInfo = `
    container: ${clientWidth}x${clientHeight}<br>
    canvas: ${size}x${size}<br>
    devicePixelRatio: ${DPR} (${window.devicePixelRatio || 1})<br>
    ?${PIXELATE}=${pixelate}
  `;

  let info = view
    ? `${newSizeInfo.trim()}<br>x=${Math.round(view.centerX)} y=${Math.round(
        view.centerY,
      )} [${Math.round(view.width)}x${Math.round(view.height)}]`
    : newSizeInfo;

  if (materialCache) {
    info = `${info}<br><br>
      Material/Refs:<br>
      ${materialCache
        .listRefCounts()
        .map(({id, refCount}) => `${id}: ${refCount}`)
        .join('<br>')}
  `;
  }

  if (map2d) {
    const tiles = [];
    let quadsCount = 0;
    Array.from(map2d.map2dLayers.values()).forEach((layer) => {
      const meshs = layer.getObject3D().children;
      tiles.push(
        ...meshs.map((obj) => {
          quadsCount += obj.tiles.usedCount;
          return obj.name;
        }),
      );
    });
    info = `${info.trim()}<br><br>
      Tiles: ${tiles.length}<br>
      Quads: ${quadsCount}<br>
    `;
    // ${tiles.join('<br>')}
  }

  infoDisplayElement.innerHTML = info;

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
stats.showPanel(0);
document.body.appendChild(stats.dom);
Object.assign(stats.dom.style, {
  top: 'auto',
  bottom: '0',
  left: 'auto',
  right: '0',
});

let rendererShouldRender = true;

const SPEED = 130; // pixels per second

let speedNorth = 0;
let speedEast = 0;
let speedSouth = 0;
let speedWest = 0;

let lastTime = 0;

function render(time) {
  const isResized = resize();

  let t = 0;
  if (lastTime === 0) {
    lastTime = time / 1000;
  } else {
    const t0 = time / 1000;
    t = t0 - lastTime;
    lastTime = t0;
  }

  rendererShouldRender =
    rendererShouldRender || 0 < speedNorth + speedEast + speedSouth + speedWest;
  rendererShouldRender = rendererShouldRender || curCamera === camera3d;

  if (isResized || rendererShouldRender) {
    controls.update();

    if (view) {
      view.centerY -= speedNorth * t;
      view.centerY += speedSouth * t;
      view.centerX += speedEast * t;
      view.centerX -= speedWest * t;
      view.update();

      // projection.origin.set(view.centerX, view.centerY);
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
  // TextureIndexedAtlas.load('sketch-tiles.json', './atlas/'),

  TiledMap.load('./assets/exports/maps/lab-wall-tiles-new-map.json'),
  // TextureIndexedAtlas.load('lab-wall-tiles-new.json', './atlas/'),
]).then(async ([tiledMap /*, texLib*/]) => {
  await tiledMap.loadTileSets('./assets/exports/maps/');

  console.log('auto-loaded tilesets:', tiledMap.tilesets);

  /*
  tiledMap.tilesets.forEach(tileset => {
    const imgEl = tileset.getImageSource();
    const el = document.querySelector('.textureAtlas');
    el.appendChild(imgEl);
  });
  */

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
  // console.log('TextureIndexedAtlas', texLib);

  map2d = new Map2D();
  scene.add(map2d);

  console.log('map2d', map2d);

  materialCache = map2d.materialCache;

  // @ts-ignore
  window.map2d = map2d;

  // const flat2dTiles = new Map2DFlat2DTilesLayer(texLib);
  // map2d.appendLayer(flat2dTiles);

  /*
  const meshCache = new TileQuadMeshCache();

  const backTileQuads = new Map2DTileQuadsLayer(tiledMap.tilesets, meshCache); // texLib);
  backTileQuads.getObject3D().position.add(new THREE.Vector3(0, -10, 0));
  map2d.appendLayer(backTileQuads);

  const mainTileQuads = new Map2DTileQuadsLayer(tiledMap.tilesets, meshCache); // texLib);
  map2d.appendLayer(mainTileQuads);

  const frontTileQuads = new Map2DTileQuadsLayer(tiledMap.tilesets, meshCache); // texLib);
  frontTileQuads.getObject3D().position.add(new THREE.Vector3(0, 10, 0));
  map2d.appendLayer(frontTileQuads);
  */

  view = new Map2DView(map2d, projection, 0, 0, 100, 100);

  // tiledMap.createLayers(map2d, view);
  tiledMap.createLayers(map2d, view, {layers: ['main', 'foreground']});

  // view.addLayer(new Map2DViewLayer(view, layerMain, tiledMap.getLayer('main')));
  // view.addLayer(new Map2DViewLayer(view, flat2dTiles, tiledMap.getLayer('Kachelebene 1')));
  /*
  view.addLayer(new Map2DViewLayer(view, backTileQuads, tiledMap.getLayer('background')));
  view.addLayer(new Map2DViewLayer(view, mainTileQuads, tiledMap.getLayer('main')));
  view.addLayer(new Map2DViewLayer(view, frontTileQuads, tiledMap.getLayer('foreground')));
  */

  const ball = await TileSet.load('ball-pattern-rot.png', {
    basePath: './assets/exports/maps/',
  });
  view.addLayer(
    new Map2DViewLayer(
      view,
      Map2DTileQuadsLayer.appendNewLayer(map2d, [ball]),
      RepeatingPatternLayer.fromTile(ball, 1),
      [0, 0, -100],
    ),
  );

  // view.update();

  viewFrame = new Map2DViewFrame(map2d, 0x66ff00, 0.5);
  map2d.add(viewFrame);

  rendererShouldRender = true;

  document.addEventListener('keydown', (event) => {
    const {keyCode} = event;
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
      projection.update(view.width, view.height);
      rendererShouldRender = true;
    }
  };

  document.addEventListener('keyup', (event) => {
    const {keyCode} = event;
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
        curCamera = projection.camera;
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
        changeViewSize(curCamera === projection.camera ? 1.1 : 0.9);
        break;
    }
  });
});

// ===== load gtlf =/=/============////==================================-------

// new GLTFLoader().load('gltf/lab-walls-tiles.glb', (gltf) => {
//   console.log('loaded gltf:', gltf);
// });

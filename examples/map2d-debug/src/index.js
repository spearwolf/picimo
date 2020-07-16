/* eslint-disable no-console */
import {
  Display,
  Map2D,
  Map2DPanControl,
  Map2DView,
  ParallaxProjection,
  Plane,
  Stage2D,
  TileSet,
  Map2DViewLayer,
  RepeatingPatternLayer,
  Map2DTileQuadsLayer,
} from 'picimo';
import {PerspectiveCamera, Vector3} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {Lines} from './Lines';

const display = new Display(document.querySelector('[picimo]'));
const projection = new ParallaxProjection(Plane.XZ, {pixelZoom: 1});
const stage = new Stage2D(projection);

window.display = display;
window.projection = projection;
window.stage = stage;

projection.update(display.width, display.height);
display.on('resize', ({width, height}) => projection.update(width, height));

const createLayerFromImage = async (map2d, view, imageFile, viewOffset) => {
  const frame = await TileSet.load(imageFile, {basePath: './assets/'});
  return view.addLayer(
    new Map2DViewLayer(
      view,
      Map2DTileQuadsLayer.appendNewLayer(map2d, [frame]),
      RepeatingPatternLayer.fromTile(frame, 1),
      viewOffset,
    ),
  );
};

display.on('init', async ({width, height}) => {
  const map2d = new Map2D();
  const view = new Map2DView(map2d, projection, 0, 0, width / 3, height / 3);
  display.on('frame', () => view.update());

  console.log(map2d);
  console.log(view);

  window.map2d = map2d;
  window.view = view;

  const layer16x = await createLayerFromImage(
    map2d,
    view,
    'map2d-debug-tile-back-16x16-dark.png',
    [0, 0, -50],
  );

  /*
  createLayerFromImage(map2d, view, 'map2d-debug-tile-back-100x100.png', [
    0,
    0,
    -25,
  ]);
  */

  const layer256x = await createLayerFromImage(
    map2d,
    view,
    'map2d-debug-tiles_4x256x256-dark.png',
    [0, 0, -10],
  );

  /*
  createLayerFromImage(map2d, view, 'map2d-debug-tile_800x600.png', [0, 0, 25]);

  createLayerFromImage(map2d, view, 'map2d-debug-tile_2000x400.png', [
    0,
    0,
    50,
  ]);
  */

  // =====================================
  // map2d pan control
  // =====================================

  const panControl = new Map2DPanControl(view, {
    disablePointer: true,
    speed: 256,
  });

  display.on('frame', ({deltaTime}) => {
    panControl.update(deltaTime);
  });

  // =====================================
  // orbit camera & controls
  // =====================================

  const orbitCamera = new PerspectiveCamera(
    80,
    display.width / display.height,
    1,
    10000,
  );

  orbitCamera.position.z = 500;
  orbitCamera.position.y = 300;
  orbitCamera.lookAt(0, 0, 0);

  display.on('resize', ({width, height}) => {
    orbitCamera.aspect = width / height;
    orbitCamera.updateProjectionMatrix();
  });

  const orbit = new OrbitControls(orbitCamera, display.renderer.domElement);

  orbit.screenSpacePanning = true;
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.25;

  const orbitMap2d = new OrbitControls(
    projection.camera,
    display.renderer.domElement,
  );

  orbitMap2d.screenSpacePanning = true;
  orbitMap2d.enableDamping = true;
  orbitMap2d.dampingFactor = 0.25;
  orbitMap2d.enabled = false;

  let showOrbitCamera = true;

  window.addEventListener('keyup', ({code}) => {
    if (code === 'KeyC') {
      showOrbitCamera = !showOrbitCamera;
      orbit.enabled = showOrbitCamera;
      orbitMap2d.enabled = !showOrbitCamera;
      document.querySelector(
        '.whichCamera > .dataValue',
      ).textContent = showOrbitCamera ? 'orbit' : 'map2d';
    }
  });

  display.on('frame', () => {
    if (orbit.enabled) {
      orbit.update();
    }
    if (orbitMap2d.enabled) {
      orbitMap2d.update();
    }

    display.renderer.render(
      stage,
      showOrbitCamera ? orbitCamera : projection.camera,
    );
  });

  // =====================================
  // lines and helpers
  // =====================================

  const lines = new Lines({capacity: 1000});
  window.lines = lines;

  const staticLines = new Lines({capacity: 1000});
  window.staticLines = staticLines;

  const makeCrossRect = (
    arr,
    upperLeft,
    upperRight,
    bottomLeft,
    bottomRight,
    cross = true,
    offset = 0,
  ) => {
    arr[offset + 0].setPosition(upperLeft, upperRight);
    arr[offset + 1].setPosition(upperLeft, bottomLeft);
    arr[offset + 2].setPosition(upperRight, bottomRight);
    arr[offset + 3].setPosition(bottomRight, bottomLeft);
    if (cross) {
      arr[offset + 4].setPosition(bottomRight, upperLeft);
      arr[offset + 5].setPosition(bottomLeft, upperRight);
    }
  };

  const makeLayerTiles = (arr, layer, z, color) => {
    const linesCount = layer.tiles.length * 4;
    if (linesCount < arr.length) {
      lines.voPool.free(arr.splice(linesCount));
    } else if (arr.length < linesCount) {
      arr.push(
        ...lines.createSprites(linesCount - arr.length).map((line) => {
          line.setColor(color);
          return line;
        }),
      );
    }
    const {viewOffsetX, viewOffsetY} = layer;
    layer.tiles.forEach((tile, i) => {
      makeCrossRect(
        arr,
        [viewOffsetX + tile.viewOffsetX, z, viewOffsetY + tile.viewOffsetY],
        [
          viewOffsetX + tile.viewOffsetX + tile.viewWidth,
          z,
          viewOffsetY + tile.viewOffsetY,
        ],
        [
          viewOffsetX + tile.viewOffsetX,
          z,
          viewOffsetY + tile.viewOffsetY + tile.viewHeight,
        ],
        [
          viewOffsetX + tile.viewOffsetX + tile.viewWidth,
          z,
          viewOffsetY + tile.viewOffsetY + tile.viewHeight,
        ],
        false,
        i * 4,
      );
    });
  };

  const map2dViewLines = lines.createSprites(6);
  map2dViewLines.forEach((line) => line.setColor(0xff0000));

  const camLines = staticLines.createSprites(1);
  camLines.forEach((line) => line.setColor(0xffffff));

  const makeCamLines = (cam, offset, color) => {
    cam.updateMatrix();
    cam.updateWorldMatrix();
    cam.updateProjectionMatrix();
    const from = new Vector3();
    cam.getWorldPosition(from);
    const to = new Vector3();
    cam.getWorldDirection(to);
    to.setLength(from.length());
    to.add(from);
    camLines[offset].setPosition(from.toArray(), to.toArray());
    camLines[offset].setColor(color);
  };

  const layerTilesLines256x = [];
  const layerTilesLines16x = [];

  display.on('frame', () => {
    makeCrossRect(
      map2dViewLines,
      [view.centerX - view.width / 2, 0, view.centerY - view.height / 2],
      [view.centerX + view.width / 2, 0, view.centerY - view.height / 2],
      [view.centerX - view.width / 2, 0, view.centerY + view.height / 2],
      [view.centerX + view.width / 2, 0, view.centerY + view.height / 2],
    );
    makeLayerTiles(layerTilesLines256x, layer256x, -9, 0x0000ff);
    makeLayerTiles(layerTilesLines16x, layer16x, -49, 0x00ff00);

    makeCamLines(showOrbitCamera ? stage.camera : orbitCamera, 0, 0xffffff);

    const [x, y] = map2d.getOrigin();
    lines.object3d.position.x = x;
    lines.object3d.position.z = y;
    lines.object3d.updateMatrix();

    document.querySelector(
      '.centerPos > .dataValue',
    ).textContent = `${Math.round(view.centerX)},${Math.round(view.centerY)}`;
  });

  const makeLayerUi = (cssRoot, layer) => {
    document.querySelectorAll(`${cssRoot} .slider`).forEach((el) => {
      el.addEventListener('input', (event) => {
        const {value} = event.target;
        event.target.parentNode.querySelector('.dataValue').textContent = value;
        const isSliderX = event.target.className.indexOf('sliderX') >= 0;

        const viewOffsetX = isSliderX ? parseInt(value, 10) : layer.viewOffsetX;
        const viewOffsetY = isSliderX ? layer.viewOffsetY : parseInt(value, 10);
        layer.setViewOffset(viewOffsetX, viewOffsetY);
      });
    });
  };

  makeLayerUi('.viewOffset256x', layer256x);
  makeLayerUi('.viewOffset16x', layer16x);

  stage.add(map2d);
  stage.add(lines.object3d);
  stage.add(staticLines.object3d);
});

display.start();

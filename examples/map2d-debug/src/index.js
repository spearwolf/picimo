/* eslint-disable no-console */
import {
  Display,
  Map2D,
  // Map2DPanControl,
  Map2DView,
  ParallaxProjection,
  Plane,
  Stage2D,
  TileSet,
  Map2DViewLayer,
  RepeatingPatternLayer,
  Map2DTileQuadsLayer,
} from 'picimo';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {Lines} from './Lines';

const display = new Display(document.querySelector('[picimo]'));
const projection = new ParallaxProjection(Plane.XZ, {pixelZoom: 1});
const stage = new Stage2D(projection);

projection.update(display.width, display.height);
display.on('resize', ({width, height}) => projection.update(width, height));

const createLayerFromImage = async (map2d, view, imageFile, viewOffset) => {
  const frame = await TileSet.load(imageFile, {basePath: './assets/'});
  view.addLayer(
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

  createLayerFromImage(map2d, view, 'map2d-debug-tile-back-16x16.png', [
    0,
    0,
    -50,
  ]);

  /*
  createLayerFromImage(map2d, view, 'map2d-debug-tile-back-100x100.png', [
    0,
    0,
    -25,
  ]);
  */

  createLayerFromImage(map2d, view, 'map2d-debug-tiles_4x256x256.png', [
    0,
    0,
    -10,
  ]);

  /*
  createLayerFromImage(map2d, view, 'map2d-debug-tile_800x600.png', [0, 0, 25]);

  createLayerFromImage(map2d, view, 'map2d-debug-tile_2000x400.png', [
    0,
    0,
    50,
  ]);
  */

  /*
  const panControl = new Map2DPanControl(view, projection);

  display.on('frame', ({deltaTime}) => {
    panControl.update(deltaTime);
  });
  */

  // =====================================
  // orbit controls
  // =====================================

  const orbitCamera = stage.camera.clone();

  // camera.position.z = 500;
  // camera.position.y = 300;
  // camera.lookAt(0, 0, 0);

  const orbit = new OrbitControls(orbitCamera, display.renderer.domElement);

  orbit.screenSpacePanning = true;
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.25;

  display.on('frame', () => {
    orbit.update();
    display.renderer.render(stage, orbitCamera);
  });

  // =====================================
  // lines and helpers
  // =====================================

  const lines = new Lines({capacity: 1000, color: 0xff0066});
  console.log('lines', lines);
  lines.createLine([0, 0, 0], [100, 0, 0]);
  lines.createLine([0, 0, 10], [100, 0, 10], 0x00ff00);
  lines.createLine([100, 0, 0], [100, 100, 0], 0x0000ff);
  lines.createLine([100, 100, 0], [0, 100, 0], 0xffff00);
  lines.createLine([0, 100, 0], [0, 0, 0], 0x000000);

  stage.add(map2d);
  stage.add(lines.object3d);
});

display.start();

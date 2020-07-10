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

const display = new Display(document.querySelector('[picimo]'));
const projection = new ParallaxProjection(Plane.XZ, {pixelZoom: 1});
const stage = new Stage2D(projection);

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
  stage.add(map2d);

  const view = new Map2DView(map2d, projection, 0, 0, width / 3, height / 3);

  console.log(map2d);
  console.log(view);

  createLayerFromImage(map2d, view, 'map2d-debug-tile-back-16x16.png', [
    0,
    0,
    -50,
  ]);

  createLayerFromImage(map2d, view, 'map2d-debug-tile-back-100x100.png', [
    0,
    0,
    -25,
  ]);

  createLayerFromImage(map2d, view, 'map2d-debug-tiles_4x256x256.png', [
    0,
    0,
    0,
  ]);

  createLayerFromImage(map2d, view, 'map2d-debug-tile_800x600.png', [0, 0, 25]);

  createLayerFromImage(map2d, view, 'map2d-debug-tile_2000x400.png', [
    0,
    0,
    50,
  ]);

  const panControl = new Map2DPanControl(view, projection);

  display.on('frame', ({deltaTime}) => {
    panControl.update(deltaTime);
    view.update();
  });
});

display.stage = stage;
display.start();

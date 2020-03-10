/* eslint-disable no-console */
import {
  Display,
  Stage2D,
  OrthographicProjection,
  Plane,
  Map2D,
  TiledMap,
  Map2DView,
} from 'picimo';

const display = new Display(document.querySelector('[picimo]'));

const projection = new OrthographicProjection(Plane.XZ, {pixelZoom: 2});

display.stage = new Stage2D(projection);

display.on('init', async () => {
  const map2d = new Map2D();
  display.stage.add(map2d);

  const view = new Map2DView(
    map2d,
    projection,
    0,
    0,
    projection.width,
    projection.height,
    100,
    100,
  );

  const tiledMap = await TiledMap.load('./assets/lab-wall-tiles-new-map.json');
  await tiledMap.loadTileSets('./assets/');

  console.log('loaded tilesets:', tiledMap.tilesets);

  tiledMap.createLayers(map2d, view, {layers: ['main', 'foreground']});

  display.on('frame', () => {
    view.update();
  });
});

display.start();

console.log(display);

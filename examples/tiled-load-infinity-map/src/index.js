/* eslint-disable no-console */
import {
  Display,
  Stage2D,
  OrthographicProjection,
  Plane,
  Map2D,
  TiledMap,
  Map2DView,
  Map2DPanControl,
} from 'picimo';

const display = new Display(document.querySelector('[picimo]'));
const projection = new OrthographicProjection(Plane.XZ, {pixelZoom: 2});
const stage = new Stage2D(projection);

display.on('init', async () => {
  const map2d = new Map2D();
  const view = new Map2DView(map2d, projection, 100, 100);

  console.log(map2d);
  console.log(view);

  const tiledMap = await TiledMap.load('./assets/lab-wall-tiles-new-map.json');
  await tiledMap.loadTileSets('./assets/');

  console.log('loaded tilesets:', tiledMap.tilesets);

  tiledMap.createLayers(map2d, view); //, {layers: ['main', 'foreground']});

  const panControl = new Map2DPanControl(view, projection);

  stage.add(map2d);

  display.on('frame', ({deltaTime}) => {
    panControl.update(deltaTime);
    view.update();
  });
});

display.stage = stage;
display.start();

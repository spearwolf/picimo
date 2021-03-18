/* eslint-disable no-console */
import {
  Display,
  Map2D,
  Map2DPanControl,
  Map2DView,
  OrthographicProjection,
  Plane,
  Stage2D,
  TiledMap,
} from 'picimo';

const display = new Display(document.querySelector('[picimo]'));
const projection = new OrthographicProjection(Plane.XZ, {pixelZoom: 2});
const stage = new Stage2D(projection);

display.on('init', async () => {
  const map2d = new Map2D();
  const view = new Map2DView(map2d, projection, 0, 0, 1024, 1024);

  console.log(map2d);
  console.log(view);

  const tiledMap = await TiledMap.load('./assets/lab-wall-tiles-new-map.json');
  await tiledMap.loadTileSets('./assets/');
  tiledMap.createLayers(map2d, view); //, {layers: ['main', 'foreground']});

  console.log('loaded tilesets:', tiledMap.tilesets);

  const panControl = new Map2DPanControl(view, projection);

  stage.scene.add(map2d);

  display.on('frame', ({deltaTime}) => {
    panControl.update(deltaTime);
    view.update();
  });
});

display.stage = stage;
display.start();

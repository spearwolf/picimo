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
  stage.scene.add(map2d);

  const view = new Map2DView(map2d, projection, 880, 530, 400, 400);

  const tiledMap = await TiledMap.load(
    './assets/20200313-2bit-dungeon-100x100.json',
  );

  await tiledMap.loadTileSets('./assets/', {
    '2bit-dungeon-tiles': '2bit-dungeon-tiles.png',
  });

  tiledMap.createLayers(map2d, view);

  const panControl = new Map2DPanControl(view, projection);

  display.on('frame', ({deltaTime}) => {
    panControl.update(deltaTime);
    view.update();
  });

  console.log('create map2d', map2d);
  console.log('create map2d view', view);
  console.log('load tilesets', tiledMap.tilesets);
});

display.stage = stage;
display.start();

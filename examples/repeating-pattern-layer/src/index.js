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
} from 'picimo';

const display = new Display(document.querySelector('[picimo]'));
const projection = new ParallaxProjection(Plane.XZ, {pixelZoom: 2});
const stage = new Stage2D(projection);

const loadBallLayer = async (map2d, view) => {
  const ball = await TileSet.load('ball-pattern-blau.png', {
    basePath: './assets/',
  });
  view.addLayer(
    new Map2DViewLayer(
      view,
      map2d.createTileQuadMeshLayer([ball], -50),
      RepeatingPatternLayer.fromTile(ball, 1),
    ),
  );
};

const loadFrameLayer = async (map2d, view) => {
  const frame = await TileSet.load('frame-2.png', {basePath: './assets/'});
  view.addLayer(
    new Map2DViewLayer(
      view,
      map2d.createTileQuadMeshLayer([frame]),
      RepeatingPatternLayer.fromTile(frame, 1),
    ),
  );
};

display.on('init', async ({width, height}) => {
  const map2d = new Map2D();
  const view = new Map2DView(map2d, projection, 0, 0, width / 3, height / 3);

  console.log(map2d);
  console.log(view);

  loadBallLayer(map2d, view);
  loadFrameLayer(map2d, view);

  const panControl = new Map2DPanControl(view, projection);

  stage.add(map2d);

  display.on('frame', ({deltaTime}) => {
    panControl.update(deltaTime);
    view.update();
  });
});

display.stage = stage;
display.start();

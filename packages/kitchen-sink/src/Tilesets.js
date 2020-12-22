/* eslint-env browser */
import {
  SimpleSprites,
  SimpleSpritesMaterial,
  TileSet,
  SpriteGridLayout,
} from 'picimo';

import {makeExampleShell} from './utils/makeExampleShell';

makeExampleShell(
  document.getElementById('container'),
  {
    alpha: true,
    antialias: true,
    autoRotate: false,
    showCube: false,
  },
  async ({camera, scene, display}) => {
    camera.position.y = 100;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);

    const tileset = await TileSet.load('amigaballs.png', {
      basePath: '/assets/',
      tileWidth: 16,
      tileHeight: 16,
      margin: 2,
      spacing: 2,
      tileCount: 5,
    });

    const material = new SimpleSpritesMaterial(
      display.textureFactory.create(tileset),
    );
    const mesh = new SimpleSprites(material, {
      capacity: 100,
      dynamic: true,
      autotouch: true,
    });

    scene.add(mesh);

    const layout = new SpriteGridLayout(16, 16, 4, 8);
    const sprites = mesh.sprites.createSpritesFromTextures(
      tileset.randomFrames(16),
    );

    layout.build(sprites);
  },
);

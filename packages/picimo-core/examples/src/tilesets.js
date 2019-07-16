/* eslint-disable no-console */
/* eslint-env browser */
import { makeExampleShell } from './utils/makeExampleShell';
import { SimpleSprites, SimpleSpritesMaterial, TileSet, SpriteGridLayout } from '../../src';

makeExampleShell(
  document.getElementById('container'),
  {
    alpha: true,
    antialias: true,
    autoRotate: false,
    showCube: false,
  },
  async ({ camera, scene, display }) => {

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

    const material = new SimpleSpritesMaterial(display.texUtils.makeTexture(tileset));
    const mesh = new SimpleSprites(material, { capacity: 100, dynamic: true, autotouch: true });

    scene.add(mesh);

    const layout = new SpriteGridLayout(16, 16, 4, 8);
    const sprites = mesh.sprites.createSpritesFromTextures(tileset.randomFrames(16));

    layout.build(sprites);

  },
);

/* eslint-disable no-console */
/* eslint-env browser */
import { makeExampleShell } from './utils/makeExampleShell';
import { SimpleSprites, SimpleSpritesMaterial, TileSet } from '../../src';

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

    const sprites = mesh.sprites.createSpritesFromTextures(tileset.randomFrames(16));

    const TILE_WIDTH = 16;
    const TILE_HEIGHT = 16;
    const COLUMNS = 4;
    const SPACING = 8;

    const rows = Math.ceil(sprites.length / COLUMNS);
    const maxWidth = (COLUMNS * TILE_WIDTH) + ((COLUMNS - 1) * SPACING);
    const maxHeight = (rows * TILE_HEIGHT) + (rows > 0 ? rows * SPACING : 0);
    const halfWidth = maxWidth / 2;
    const halfHeight = maxHeight / 2;

    for (let i = 0; i < sprites.length; i++) {
      const row = Math.floor(i / COLUMNS);
      const y = (row * TILE_HEIGHT) + (row > 0 ? row * SPACING : 0) - halfHeight;
      const x = ((i % COLUMNS) * TILE_WIDTH) + ((i % COLUMNS) * SPACING) - halfWidth;
      sprites[i].translate(x, y, 0);
    }

  },
);

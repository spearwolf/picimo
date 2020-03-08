/* eslint-disable no-console */
/* eslint-env browser */
import {TextureAtlas, SimpleSprites, SimpleSpritesMaterial} from 'picimo';

import {makeExampleShell} from './utils/makeExampleShell';

makeExampleShell(
  document.getElementById('container'),
  {
    autoRotate: true,
    showCube: false,
  },
  async ({camera, scene, display}) => {
    camera.position.y = 400;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);

    const CAPACITY = 256;

    // const material = new SimpleSpritesMaterial();
    const atlas = await TextureAtlas.load('amigaballs.json', '/assets/');
    const material = new SimpleSpritesMaterial(
      display.textureFactory.makeThreeTexture(atlas),
    );
    // material.texture = display.textureFactory.makeThreeTexture(atlas);

    const mesh = new SimpleSprites(material, {
      capacity: CAPACITY,
      dynamic: true,
      autotouch: true,
    });

    scene.add(mesh);

    const sprites = mesh.sprites.createSpritesFromTextures(
      atlas.randomFrames(CAPACITY),
    );

    display.on('frame', ({now}) => {
      for (let i = 0, t = now * 0.5; i < sprites.length; i++, t += 0.046) {
        const a = Math.sin(Math.sin(t * 0.5) + Math.sin(t) * 1.3 * 0.25) + 0.25;
        const b = Math.cos(Math.cos(t * 0.25) + Math.cos(t) * 2) * 0.5;
        const x = Math.sin(t) * a * 400;
        const y = Math.cos(t) * b * 400;

        sprites[i].translate(x, y, i * 0.66);
      }
    });
  },
);

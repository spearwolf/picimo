/* eslint-disable no-console */
/* eslint-env browser */
import { makeExampleShell } from './utils/makeExampleShell';
import { TextureAtlas, SimpleSprites, SimpleSpritesMaterial } from '../../src';

makeExampleShell(
  document.getElementById('container'),
  {
    alpha: true,
    autoRotate: true,
    showCube: false,
  },
  async ({ camera, scene, display }) => {

    camera.position.y = 400;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);

    const CAPACITY = 256;

    const atlas = await TextureAtlas.load('amigaballs.json', '/assets/');
    const material = new SimpleSpritesMaterial(display.texUtils.makeTexture(atlas));
    const mesh = new SimpleSprites(material, { capacity: CAPACITY, dynamic: true, autotouch: true });

    scene.add(mesh);

    const sprites = mesh.sprites.createSpritesFromTextures(atlas.randomFrames(CAPACITY));

    display.addEventListener('frame', ({ now }) => {

      for (let i = 0, t = now * .5; i < sprites.length; i++, t+= .046) {

        const a = Math.sin(Math.sin(t * .5) + (Math.sin(t) * 1.3) * .25) + .25;
        const b = Math.cos(Math.cos(t * .25) + (Math.cos(t) * 2)) * .5;
        const x = Math.sin(t) * a * 400;
        const y = Math.cos(t) * b * 400;

        sprites[i].translate(x, y, i * .66);

      }
    });

  },
);

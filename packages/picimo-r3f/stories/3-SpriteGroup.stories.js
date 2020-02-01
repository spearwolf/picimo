/* eslint-env browser */
/* eslint-disable no-console */
import React from 'react';
import {Canvas} from 'react-three-fiber';
import {Stage2D, SpriteGroupMesh, SimpleSpritesBufferGeometry, SimpleSpritesMaterial, TextureAtlas, Sprites} from 'picimo-r3f';
import {withKnobs, boolean, select} from '@storybook/addon-knobs';
import { Logger } from 'picimo';

export default {
  title: 'SpriteGroup',
  decorators: [withKnobs],
};

const PROJECTION = {
  width: 640,
  height: 480,
  fit: 'contain',
  distance: 1000,
  far: 10000,
};

const MIN_SIZE = 35;
const MAX_SIZE = 150;

const TEXTURE_ATLAS_SRC = [
  'nobinger.json',
  'amigaballs.json',
  'clouds.json',
  'starscape.json',
];

const SPRITES = 32;

// TODO useProjection() hook?

const log = new Logger('story');

const createSprites = ({spriteGroup, textureAtlas}) => {

  const sprites = spriteGroup.createSpritesFromTextures(textureAtlas.randomFrames(SPRITES));

  const halfOfSprites = Math.floor(SPRITES / 2);
  const w = sprites.map(s => s.width).sort().slice(0, halfOfSprites).reduce((sum, w) => sum + w, 0) / halfOfSprites;
  const scale = w > MIN_SIZE ? (w < MAX_SIZE ? 0 : MAX_SIZE / w) : MIN_SIZE / w;

  log.log('average width of sprites:', w, textureAtlas);

  sprites.forEach(sprite => {
    const [x, y] = [
      (Math.random() * PROJECTION.width) - (PROJECTION.width * 0.5),
      (Math.random() * PROJECTION.height) - (PROJECTION.height * 0.5),
    ];
    sprite.translate(x, y, 0);

    if (scale) {
      sprite.width *= scale;
      sprite.height *= scale;
    }
  });

  return sprites;
}

const onCreate = ctx => {
  log.log('CREATE SPRITES', ctx);
  return createSprites(ctx);
}

const onTextureAtlasChange = (ctx, sprites) => {
  log.log('TEXTURE-ATLAS CHANGE', ctx, sprites);
  ctx.spriteGroup.voPool.free(sprites);
  return createSprites(ctx);
}

export const SimpleSprites = () => {
  return (
    <section>
      <div style={{backgroundColor: '#d0e9f0'}}>
        <Canvas gl2 pixelRatio={window.devicePixelRatio} style={{minHeight: '480px'}}>
          <Stage2D plane="xz" type="parallax" projection={PROJECTION}>

            { boolean('render <TextureAtlas>', true) && (
              <TextureAtlas
                name="spritesAtlas"
                src={select('texture-atlas', TEXTURE_ATLAS_SRC, TEXTURE_ATLAS_SRC[0])}
              />
            )}

            { boolean('show <SpriteGroupMesh>', true) && (
              <SpriteGroupMesh>

                <SimpleSpritesMaterial attach="material" texture="spritesAtlas" />

                <SimpleSpritesBufferGeometry
                  attach="geometry"
                  capacity={512}
                  dynamic={true}
                  autotouch={true}
                >
                  { boolean('show <Sprites>', true) && (
                    <Sprites
                      textureAtlas="spritesAtlas"
                      onCreate={onCreate}
                      onTextureAtlasChange={onTextureAtlasChange}
                    />
                  )}
                </SimpleSpritesBufferGeometry>

              </SpriteGroupMesh>
            )}

          </Stage2D>
        </Canvas>
      </div>
    </section>
  )
};

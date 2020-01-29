/* eslint-env browser */
/* eslint-disable no-console */
import React from 'react';
import {Canvas} from 'react-three-fiber';
import {Stage2D, SpriteGroupMesh, SimpleSpritesBufferGeometry, SimpleSpritesMaterial, TextureAtlas, Sprites} from 'picimo-r3f';
import {withKnobs, boolean, select} from '@storybook/addon-knobs';

export default {
  title: 'SpriteGroup',
  decorators: [withKnobs],
};

const PROJECTION = {
  width: 640,
  height: 400,
  fit: 'contain',
  distance: 1000,
  far: 10000,
};

// TODO useProjection() hook?

const createSprites = ({spriteGroup, textureAtlas}) => {

  const sprites = spriteGroup.createSpritesFromTextures(textureAtlas.randomFrames(24));

  sprites.forEach(sprite => {
    const [x, y] = [
      (Math.random() * PROJECTION.width) - (PROJECTION.width * 0.5),
      (Math.random() * PROJECTION.height) - (PROJECTION.height * 0.5),
    ];
    sprite.translate(x, y, 0);
  });

  return sprites;
}

const onCreate = ctx => {
  const sprites = createSprites(ctx);
  console.log('[story] CREATE SPRITES', ctx, sprites);
  return sprites;
}

const onTextureAtlasChange = (ctx, sprites) => {
  console.log('[story] TEXTURE-ATLAS CHANGE', ctx, sprites);
  ctx.spriteGroup.voPool.free(sprites);
  return onCreate(ctx);
}

export const SimpleSprites = () => {
  return (
    <section>
      <div style={{backgroundColor: '#d0e9f0'}}>
        <Canvas gl2 pixelRatio={window.devicePixelRatio} style={{minHeight: '400px'}}>
          <Stage2D plane="xz" type="parallax" projection={PROJECTION}>

            { boolean('render <TextureAtlas>', true) && (
              <TextureAtlas
                name="spritesAtlas"
                src={select('texture-atlas', ['nobinger.json', 'amigaballs.json'], 'nobinger.json')}
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

/* eslint-env browser */
/* eslint-disable no-console */
import React from 'react';
import {Canvas} from 'react-three-fiber';
import {Stage2D, SpriteGroupMesh, SimpleSpritesBufferGeometry, SimpleSpritesMaterial, TextureAtlas, Sprites} from 'picimo-r3f';
import {withKnobs, boolean} from '@storybook/addon-knobs';

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

const onCreate = ({spriteGroup, textureAtlas}) => {

  const sprites = spriteGroup.createSpritesFromTextures(textureAtlas.randomFrames(24));

  sprites.forEach(sprite => {
    const [x, y] = [
      (Math.random() * PROJECTION.width) - (PROJECTION.width * 0.5),
      (Math.random() * PROJECTION.height) - (PROJECTION.height * 0.5),
    ];
    sprite.translate(x, y, 0);
  });

  console.log('CREATE SPRITES', spriteGroup, textureAtlas, sprites);

  return sprites;
}

export const SimpleSprites = () => {
  return (
    <section>
      <div style={{backgroundColor: '#d0e9f0'}}>
        <Canvas gl2 pixelRatio={window.devicePixelRatio} style={{minHeight: '400px'}}>
          <Stage2D plane="xz" type="parallax" projection={PROJECTION}>

            <TextureAtlas name="nobinger" src="nobinger.json" />

            { boolean('show <SpriteGroupMesh>', true) && (
              <SpriteGroupMesh>

                <SimpleSpritesMaterial attach="material" texture="nobinger" />

                <SimpleSpritesBufferGeometry
                  attach="geometry"
                  capacity={512}
                  dynamic={true}
                  autotouch={true}
                >
                  { boolean('show <Sprites>', true) && (
                    <Sprites textureAtlas="nobinger" onCreate={onCreate} />
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

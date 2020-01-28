/* eslint-env browser */
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

export const SimpleSprites = () => {
  return (
    <section>
      <div style={{backgroundColor: '#d0e9f0'}}>
        <Canvas gl2 pixelRatio={window.devicePixelRatio} style={{minHeight: '400px'}}>
          <Stage2D plane="xy" type="parallax" projection={PROJECTION}>

            { boolean('show <SpriteGroupMesh>', true) && (
              <SpriteGroupMesh>

                <SimpleSpritesBufferGeometry
                  attach="geometry"
                  capacity={512}
                  autotouch={true}
                >
                  <Sprites
                    textureAtas="nobinger"
                    onCreate={args => console.log('SPRITES!', args)}
                  />
                </SimpleSpritesBufferGeometry>

                <SimpleSpritesMaterial attach="material" texture="nobinger" />
                <TextureAtlas name="nobinger" src="nobinger.json" />

              </SpriteGroupMesh>
            )}

          </Stage2D>
        </Canvas>
      </div>
    </section>
  )
};

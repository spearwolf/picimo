/* eslint-env browser */
import React, {useState} from 'react';
import {Canvas} from 'react-three-fiber';
import {Stage2D, BitmapText2D, BitmapText2DBlock, TextureAtlas} from 'picimo-r3f';
import {number, withKnobs, text, select, boolean} from '@storybook/addon-knobs';

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

const HELLO = `TODO:
CREATE A
SPRITEGROUP
EXAMPLE`;

export const SimpleSprites = () => {
  const [usedCount, setUsedCount] = useState(0);
  return (
    <section>
      <div style={{backgroundColor: '#d0e9f0'}}>
        <Canvas gl2 pixelRatio={window.devicePixelRatio} style={{minHeight: '400px'}}>
          <Stage2D plane="xy" type="parallax" projection={PROJECTION}>

            { boolean('show <BitmapText2DB>', true) && (
              <BitmapText2D onFrame={bt2d => setUsedCount(bt2d.bitmapChars.usedCount)}>
                <TextureAtlas
                  attach="fontAtlas"
                  src={select('texture-atlas', ['comic-schrift.json', 'rbmfs.json'], 'comic-schrift.json')}
                />

                { boolean('show <BitmapText2DBlock>', true) && (
                  <BitmapText2DBlock
                    fontSize={number('fontSize', 50)}
                    lineGap={number('lineGap', 5)}
                    text={text('text', HELLO)}
                  />
                )}
              </BitmapText2D>
            )}

          </Stage2D>
        </Canvas>
      </div>

      <div>
        <p>sprite count: {usedCount}</p>
      </div>
    </section>
  )
};

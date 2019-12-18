import React from 'react';
import {Canvas} from 'react-three-fiber';
import {Stage2D, BitmapText2D, BitmapText2DBlock, TextureAtlas} from 'picimo-r3f';
import {number, withKnobs, text, select} from '@storybook/addon-knobs';

export default {
  title: 'BitmapText2D',
  decorators: [withKnobs],
};

const PROJECTION = {
  width: 480,
  height: 240,
  fit: 'contain',
  distance: 1000,
  far: 10000,
};

const HELLO = `HELLO
STORYBOOK!`;

export const demo = () => (
  <div style={{backgroundColor: '#d0e9f0'}}>
    <Canvas>
      <Stage2D plane="xy" type="parallax" projection={PROJECTION}>

        <BitmapText2D position={[0, 0, 1]}>
          <TextureAtlas attach="fontAtlas" src="comic-schrift.json" />
          <BitmapText2DBlock
            fontSize={number('fontSize', 100)}
            lineGap={number('lineGap', 0)}
            text={text('text', HELLO)}
            hAlign={select('hAlign', ['center', 'left', 'right'], 'center')}
            vAlign={select('vAlign', ['top', 'baseline', 'center', 'bottom'], 'center')}
            position={[0, 0, 0]}
          />
        </BitmapText2D>

      </Stage2D>
    </Canvas>
  </div>
);

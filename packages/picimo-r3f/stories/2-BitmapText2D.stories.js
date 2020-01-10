/* eslint-env browser */
import React, {useState, useMemo} from 'react';
import {Canvas} from 'react-three-fiber';
import {Stage2D, BitmapText2D, BitmapText2DBlock, TextureAtlas} from 'picimo-r3f';
import {number, withKnobs, text, select, boolean} from '@storybook/addon-knobs';

export default {
  title: 'BitmapText2D',
  decorators: [withKnobs],
};

const PROJECTION = {
  width: 640,
  height: 400,
  fit: 'contain',
  distance: 1000,
  far: 10000,
};

const HELLO = `HELLO
STORYBOOK!`;

const makeCharCountUpdater = setCharCount => bt2d => setCharCount(bt2d.bitmapChars.usedCount);

const Story = () => {
  const [charCount, setCharCount] = useState(0);
  const updateCharCount = useMemo(() => makeCharCountUpdater(setCharCount), [setCharCount]);
  return (
    <section>
      <div style={{backgroundColor: '#d0e9f0'}}>
        <Canvas gl2 pixelRatio={window.devicePixelRatio} style={{minHeight: '400px'}}>
          <Stage2D plane="xy" type="parallax" projection={PROJECTION}>

            { boolean('show <BitmapText2DB>', true) && (
              <BitmapText2D onFrame={updateCharCount}>
                <TextureAtlas
                  attach="fontAtlas"
                  src={select('texture-atlas', ['comic-schrift.json', 'rbmfs.json'], 'comic-schrift.json')}
                />

                { boolean('show <BitmapText2DBlock>', true) && (
                  <BitmapText2DBlock
                    fontSize={number('fontSize', 100)}
                    lineGap={number('lineGap', 10)}
                    maxWidth={number('maxWidth', 0)}
                    text={text('text', HELLO)}
                    hAlign={select('hAlign', ['center', 'left', 'right'], 'center')}
                    vAlign={select('vAlign', ['top', 'baseline', 'center', 'bottom'], 'center')}
                  />
                )}
              </BitmapText2D>
            )}

          </Stage2D>
        </Canvas>
      </div>

      <div>
        <p>char count: {charCount}</p>
      </div>
    </section>
  )
};

export const demo = Story;
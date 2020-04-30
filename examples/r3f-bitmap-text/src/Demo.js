/* eslint-disable import/no-unresolved */
import {useDatGui, number} from 'datgui-context-hook';
import {
  Stage2D,
  BitmapText2D,
  BitmapText2DBlock,
  TextureAtlas,
} from 'picimo-r3f';
import React from 'react';
import {Canvas} from 'react-three-fiber';

export function Demo() {
  const {
    textureAtlas,
    fontSize,
    lineGap,
    maxWidth,
    'text.1': text1,
    'text.2': text2,
    'text.3': text3,
    hAlign,
    vAlign,
  } = useDatGui({
    textureAtlas: ['comic-schrift.json', 'rbmfs.json'],
    fontSize: number(100).min(8).max(200).step(1),
    lineGap: 10,
    maxWidth: number(0).min(0),
    'text.1': 'PICTURES',
    'text.2': 'IN',
    'text.3': 'MOTION!',
    hAlign: ['center', 'left', 'right'],
    vAlign: ['center', 'baseline', 'top', 'bottom'],
  });
  const {
    BitmapText2D: showBitmapText2d,
    BitmapText2DBlock: showBitmapText2dBlock,
  } = useDatGui('Show', {
    BitmapText2D: true,
    BitmapText2DBlock: true,
  });

  const text = [text1, text2, text3]
    .filter((str) => str && str.length)
    .join('\n');

  return (
    <Canvas>
      <Stage2D plane="xy" type="parallax" width={640} height={480}>
        {showBitmapText2d && (
          <BitmapText2D>
            <TextureAtlas
              basePath="assets/"
              attach="fontAtlas"
              src={textureAtlas}
            />
            {showBitmapText2dBlock && (
              <BitmapText2DBlock
                fontSize={fontSize}
                lineGap={lineGap}
                maxWidth={maxWidth}
                text={text}
                hAlign={hAlign}
                vAlign={vAlign}
              />
            )}
          </BitmapText2D>
        )}
      </Stage2D>
    </Canvas>
  );
}

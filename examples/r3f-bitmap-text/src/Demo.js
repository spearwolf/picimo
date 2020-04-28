// eslint-disable-next-line import/no-unresolved
import {Stage2D} from 'picimo-r3f';
import React from 'react';
import {Canvas} from 'react-three-fiber';

const PROJECTION = {
  width: 640,
  height: 400,
  fit: 'contain',
};

export function Demo() {
  return (
    <Canvas
      gl2
      pixelRatio={window.devicePixelRatio}
      style={{minHeight: '400px'}}
    >
      <Stage2D plane="xy" type="parallax" projection={PROJECTION}></Stage2D>
    </Canvas>
  );
}

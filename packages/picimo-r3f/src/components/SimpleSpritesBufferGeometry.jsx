import React, {forwardRef, useMemo} from 'react';
import {string, number, bool, arrayOf} from 'prop-types';
import {getSimpleSpriteBaseGroup, SimpleSpriteGroup, Logger} from 'picimo';
import {SpriteGroupInstancedBufferGeometry} from './SpriteGroupInstancedBufferGeometry';

const log = new Logger('<SimpleSpritesBufferGeometry>', 0, Infinity);

export const SimpleSpritesBufferGeometry = forwardRef(({
  attach,
  capacity,
  maxAllocVOSize,
  dynamic,
  autotouch,
}, ref) => {

  const baseGeometry = useMemo(getSimpleSpriteBaseGroup, []);

  const spriteGroup = useMemo(() => {
    const sprites = new SimpleSpriteGroup({capacity, maxAllocVOSize, dynamic, autotouch});
    log.log('create', sprites);
    return sprites;
  }, [
    capacity,
    maxAllocVOSize,
    dynamic,
    autotouch, // TODO no need to re-create sprite-group after change
  ]);

  return <SpriteGroupInstancedBufferGeometry
    baseGeometry={baseGeometry}
    spriteGroup={spriteGroup}
    attach={attach}
    ref={ref}
  />;
});

SimpleSpritesBufferGeometry.displayName = 'SimpleSpritesBufferGeometry';

SimpleSpritesBufferGeometry.propTypes = {
  // see https://github.com/react-spring/react-three-fiber#shortcuts-and-non-object3d-stow-away
  attach: string,
  attachArray: string,
  attachObject: arrayOf(string),

  // see picimo->SpriteGroup(Textured)Options
  capacity: number,
  maxAllocVOSize: number,
  dynamic: bool,
  autotouch: bool,
  // TODO setSize: oneOfType([string, func]),
  // ...?
}

SimpleSpritesBufferGeometry.defaultProps = {
  capacity: 1024,
  maxAllocVOSize: 256,
  dynamic: true,
  autotouch: false,
}

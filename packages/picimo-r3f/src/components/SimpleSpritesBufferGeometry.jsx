import React, {createContext, forwardRef, useMemo, useState} from 'react';
import {string, number, bool, arrayOf, node} from 'prop-types';
import {getSimpleSpriteBaseGroup, SimpleSpriteGroup, Logger} from 'picimo';
import {SpriteGroupInstancedBufferGeometry} from './SpriteGroupInstancedBufferGeometry';

export const SpriteGroupContext = createContext(null);

const log = new Logger('picimo-r3f.<SimpleSpritesBufferGeometry>');

export const SimpleSpritesBufferGeometry = forwardRef(({
  attach,
  capacity,
  maxAllocVOSize,
  dynamic,
  autotouch,
  children,
}, ref) => {

  const [spritesCtx, setSpritesCtx] = useState(null);

  const baseGeometry = useMemo(getSimpleSpriteBaseGroup, []);

  const spriteGroup = useMemo(() => {
    const sprites = new SimpleSpriteGroup({capacity, maxAllocVOSize, dynamic, autotouch});
    log.log('create', [sprites, baseGeometry]);
    setSpritesCtx([sprites, baseGeometry]);
    return sprites;
  }, [
    baseGeometry,
    capacity,
    maxAllocVOSize,
    dynamic,
    autotouch, // TODO no need to re-create sprite-group after change
  ]);

  return (
    <SpriteGroupContext.Provider value={spritesCtx}>
      <SpriteGroupInstancedBufferGeometry
        baseGeometry={baseGeometry}
        spriteGroup={spriteGroup}
        attach={attach}
        ref={ref}
      >
        {children}
      </SpriteGroupInstancedBufferGeometry>
    </SpriteGroupContext.Provider>
  );
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
  children: node,
}

SimpleSpritesBufferGeometry.defaultProps = {
  capacity: 1024,
  maxAllocVOSize: 256,
  dynamic: true,
  autotouch: false,
  children: undefined,
}

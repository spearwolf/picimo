import React, {forwardRef, useMemo} from 'react';
import {SpriteGroupInstancedBufferGeometry as PicimoSpriteGroupInstancedBufferGeometry} from 'picimo';
import {object, string} from 'prop-types';

export const SpriteGroupInstancedBufferGeometry = forwardRef(({
  baseGeometry,
  spriteGroup,
  attach,
  ...props
}, ref) => {

  const instance = useMemo(() => {
    if (baseGeometry && spriteGroup) {
      return new PicimoSpriteGroupInstancedBufferGeometry(baseGeometry, spriteGroup);
    }
    return null;
  }, [baseGeometry, spriteGroup]);

  return <primitive object={instance} attach={attach} ref={ref} {...props} />;
});

SpriteGroupInstancedBufferGeometry.displayName = 'SpriteGroupInstancedBufferGeometry';

SpriteGroupInstancedBufferGeometry.propTypes = {
  baseGeometry: object.isRequired,
  spriteGroup: object.isRequired,
  attach: string,

  // see picimo->SpriteGroup(Textured)Options
  // capacity: number,
  // maxAllocVOSize: number,
  // dynamic: bool,
  // autotouch: bool,
  // setSize: oneOfType([string, func]),
}

SpriteGroupInstancedBufferGeometry.defaultProps = {
  attach: 'geometry',
  // capacity: 1024,
  // maxAllocVOSize: 512,
  // dynamic: false,
  // autotouch: false,
}

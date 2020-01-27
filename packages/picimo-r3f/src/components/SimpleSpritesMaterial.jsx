import React, {forwardRef, useMemo} from 'react';
import {string, arrayOf, node} from 'prop-types';
import {SimpleSpritesMaterial as PicimoSimpleSpritesMaterial, Logger} from 'picimo';
import {useTexture} from 'picimo-r3f';

const log = new Logger('<SimpleSpritesMaterial>', 0, Infinity);

export const SimpleSpritesMaterial = forwardRef(({ children, texture: textureName, ...props }, ref) => {

  const [texture] = useTexture(textureName);

  // TODO update material->uniforms on texture update
  const instance = useMemo(() => {
    if (texture) {
      const material = new PicimoSimpleSpritesMaterial(texture);
      log.log('create', material);
      return material;
    }
  }, [texture]);

  return (
    <>
      {children}
      {instance && (
        <primitive object={instance} ref={ref} {...props} />
      )}
    </>
  );
});

SimpleSpritesMaterial.displayName = 'SimpleSpritesMaterial';

SimpleSpritesMaterial.propTypes = {
  // see https://github.com/react-spring/react-three-fiber#shortcuts-and-non-object3d-stow-away
  attach: string,
  attachArray: string,
  attachObject: arrayOf(string),

  children: node,

  texture: string,
}

SimpleSpritesMaterial.defaultProps = {
  node: undefined,
  texture: 'default',
}
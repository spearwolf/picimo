import React, {forwardRef, useMemo} from 'react';
import {string, arrayOf} from 'prop-types';
import {SimpleSpritesMaterial as PicimoSimpleSpritesMaterial, Logger} from 'picimo';

const log = new Logger('<SimpleSpritesMaterial>', 0, Infinity);

export const SimpleSpritesMaterial = forwardRef((props, ref) => {

  const instance = useMemo(() => {
    const material = new PicimoSimpleSpritesMaterial();
    log.log('create', material);
    return material;
  }, []);

  return <primitive object={instance} ref={ref} {...props} />;
});

SimpleSpritesMaterial.displayName = 'SimpleSpritesMaterial';

SimpleSpritesMaterial.propTypes = {
  // see https://github.com/react-spring/react-three-fiber#shortcuts-and-non-object3d-stow-away
  attach: string,
  attachArray: string,
  attachObject: arrayOf(string),
}

// SimpleSpritesMaterial.defaultProps = {
// }

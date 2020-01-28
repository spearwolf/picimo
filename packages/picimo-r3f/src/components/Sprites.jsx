import React, {useContext, useState, useEffect} from 'react';
import {func, string} from 'prop-types';
import {Logger} from 'picimo';
import {useTextureAtlas} from '../hooks';
import {SpriteGroupContext} from './SimpleSpritesBufferGeometry';

const log = new Logger('<Sprites>');

const createState = (isInitialized = false, onCreateValue = undefined, spriteGroup = undefined) => {
  if (isInitialized) {
    return {
      isInitialized,
      instance: {
        dispose() {
          if (spriteGroup && Array.isArray(onCreateValue)) {
            log.log('dispose->free', spriteGroup, onCreateValue);
            spriteGroup.voPool.free(onCreateValue);
          }
        }
      }
    }
  }
  return {isInitialized, instance: null};
}

export const Sprites = ({onCreate, textureAtlas: textureAtlasName}) => {

  const [{isInitialized, instance}, setState] = useState(createState());
  const [textureAtlas] = useTextureAtlas(textureAtlasName);
  const [sprites, baseGeometry] = useContext(SpriteGroupContext);

  useEffect(() => {
    if (!isInitialized && onCreate) {
      if (textureAtlasName) {
        if (textureAtlas) {
          setState(createState(true, onCreate({spriteGroup: sprites, baseGeometry, textureAtlas}), sprites));
        }
      } else {
        setState(createState(true, onCreate({spriteGroup: sprites, baseGeometry}), sprites));
      }
    }
  }, [isInitialized, textureAtlasName, textureAtlas, onCreate, sprites, baseGeometry, setState]);

  return instance ? <primitive object={instance} /> : null;
}

Sprites.propTypes = {
  onCreate: func,
  textureAtlas: string,
}

Sprites.defaultProps = {
  onCreate: undefined,
  textureAtlas: undefined,
}

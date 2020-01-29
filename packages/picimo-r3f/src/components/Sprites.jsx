import React, {useContext, useState, useEffect} from 'react';
import {func, string} from 'prop-types';
import {Logger} from 'picimo';
import {useTextureAtlas} from '../hooks';
import {SpriteGroupContext} from './SimpleSpritesBufferGeometry';

const log = new Logger('<Sprites>');

const createState = (isInitialized = false, instanceValue = undefined, spriteGroup = undefined) => {
  if (isInitialized) {
    return {
      isInitialized,
      instanceValue,
      instance: {
        dispose() { // react-three-fiber -> dispose callback
          if (spriteGroup && Array.isArray(this.instanceValue)) {
            log.log('dispose->free', spriteGroup, this.instanceValue);
            spriteGroup.voPool.free(this.instanceValue);
          } else if (typeof this.instanceValue?.dispose === 'function') {
            this.instanceValue.dispose();
          }
        }
      }
    }
  }
  return {isInitialized};
}

export const Sprites = ({onCreate, onTextureAtlasChange, textureAtlas: textureAtlasName}) => {

  const [state, setState] = useState(createState());
  const {isInitialized, instance, instanceValue} = state;
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

  useEffect(() => {
    if (isInitialized && onTextureAtlasChange && textureAtlas) {
      const nextInstanceValue = onTextureAtlasChange({spriteGroup: sprites, baseGeometry, textureAtlas}, instanceValue);
      if (nextInstanceValue !== undefined) {
        log.log('next instanceValue=');
        setState({ ...state, instanceValue });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textureAtlas, onTextureAtlasChange]);

  return instance ? <primitive object={instance} /> : null;
}

Sprites.propTypes = {
  onCreate: func,
  textureAtlas: string,
  onTextureAtlasChange: func,
}

Sprites.defaultProps = {
  onCreate: undefined,
  textureAtlas: undefined,
  onTextureAtlasChange: undefined,
}

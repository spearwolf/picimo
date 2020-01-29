/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useEffect, useRef} from 'react';
import {func, string} from 'prop-types';
import {Logger} from 'picimo';
import {useTextureAtlas} from '../hooks';
import {SpriteGroupContext} from './SimpleSpritesBufferGeometry';

const log = new Logger('<Sprites>');

const createState = (spriteGroup, instanceRef) => ({
  isInitialized: true,
  instance: {
    dispose() { // react-three-fiber -> dispose callback
      if (spriteGroup && Array.isArray(instanceRef.current)) {
        log.log('dispose->free', spriteGroup, instanceRef.current);
        spriteGroup.voPool.free(instanceRef.current);
      } else if (typeof instanceRef.current?.dispose === 'function') {
        instanceRef.current.dispose();
      }
    }
  }
});

export const Sprites = ({onCreate, onTextureAtlasChange, textureAtlas: textureAtlasName}) => {

  const [{isInitialized, instance}, setState] = useState({isInitialized: false});
  const [textureAtlas] = useTextureAtlas(textureAtlasName);
  const [sprites, baseGeometry] = useContext(SpriteGroupContext);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!isInitialized && onCreate) {
      if (textureAtlasName) {
        if (textureAtlas) {
          instanceRef.current = onCreate({spriteGroup: sprites, baseGeometry, textureAtlas});
          setState(createState(sprites, instanceRef));
        }
      } else {
        instanceRef.current = onCreate({spriteGroup: sprites, baseGeometry});
        setState(createState(sprites, instanceRef));
      }
    }
  }, [isInitialized, textureAtlasName, textureAtlas, onCreate]);

  useEffect(() => {
    if (isInitialized && onTextureAtlasChange && textureAtlas) {
      const nextInstanceValue = onTextureAtlasChange({spriteGroup: sprites, baseGeometry, textureAtlas}, instanceRef.current);
      if (nextInstanceValue !== undefined && nextInstanceValue !== instanceRef.current) {
        log.log('next instance-value', nextInstanceValue);
        instanceRef.current = nextInstanceValue;
      }
    }
  }, [textureAtlas]);

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

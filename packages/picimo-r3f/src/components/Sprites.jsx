/* eslint-disable react-hooks/exhaustive-deps */
import {Logger} from 'picimo';
import {func, string} from 'prop-types';
import React, {useContext, useState, useEffect, useRef} from 'react';

import {useFrame} from 'react-three-fiber';

import {useTextureAtlas} from '../hooks';

import {SpriteGroupContext} from './SimpleSpritesBufferGeometry';

const log = new Logger('picimo-r3f.<Sprites>');

const createState = (spriteGroup, instanceRef) => ({
  isInitialized: true,
  instance: {
    dispose() {
      // react-three-fiber -> dispose callback
      if (spriteGroup && Array.isArray(instanceRef.current)) {
        log.log('dispose->free', spriteGroup, instanceRef.current);
        spriteGroup.voPool.free(instanceRef.current);
      } else if (typeof instanceRef.current?.dispose === 'function') {
        instanceRef.current.dispose();
      }
    },
  },
});

export const Sprites = ({
  onCreate,
  onTextureAtlasChange,
  onFrame,
  textureAtlas: textureAtlasName,
}) => {
  const [{isInitialized, instance}, setState] = useState({
    isInitialized: false,
  });
  const [textureAtlas] = useTextureAtlas(textureAtlasName);
  const [spriteGroup, baseGeometry] = useContext(SpriteGroupContext);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!isInitialized && onCreate) {
      if (textureAtlasName) {
        if (textureAtlas) {
          instanceRef.current = onCreate({
            spriteGroup,
            baseGeometry,
            textureAtlas,
          });
          setState(createState(spriteGroup, instanceRef));
        }
      } else {
        instanceRef.current = onCreate({spriteGroup, baseGeometry});
        setState(createState(spriteGroup, instanceRef));
      }
    }
  }, [isInitialized, textureAtlasName, textureAtlas, onCreate]);

  useEffect(() => {
    if (isInitialized && onTextureAtlasChange && textureAtlas) {
      const nextInstanceValue = onTextureAtlasChange(
        {spriteGroup, baseGeometry, textureAtlas},
        instanceRef.current,
      );
      if (
        nextInstanceValue !== undefined &&
        nextInstanceValue !== instanceRef.current
      ) {
        log.log('next instance-value', nextInstanceValue);
        instanceRef.current = nextInstanceValue;
      }
    }
  }, [textureAtlas]);

  useFrame((state, delta) => {
    if (isInitialized && onFrame) {
      onFrame(
        {spriteGroup, baseGeometry, textureAtlas, state},
        instanceRef.current,
        delta,
      );
    }
  });

  return instance ? <primitive object={instance} /> : null;
};

Sprites.propTypes = {
  onCreate: func,
  textureAtlas: string,
  onTextureAtlasChange: func,
  onFrame: func,
};

Sprites.defaultProps = {
  onCreate: undefined,
  textureAtlas: undefined,
  onTextureAtlasChange: undefined,
  onFrame: undefined,
};

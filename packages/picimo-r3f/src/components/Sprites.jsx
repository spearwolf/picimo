import React, {useContext, useState, useEffect} from 'react';
import {func, string} from 'prop-types';
import {useTextureAtlas} from '../hooks';
import {SpriteGroupContext} from './SimpleSpritesBufferGeometry';

export const Sprites = ({onCreate, textureAtlas: textureAtlasName}) => {

  const [isInitialized, setInitialized] = useState(false);
  const [textureAtlas] = useTextureAtlas(textureAtlasName);
  const [sprites, baseGeometry] = useContext(SpriteGroupContext);

  useEffect(() => {
    if (!isInitialized) {
      if (textureAtlasName) {
        if (textureAtlas && onCreate) {
          onCreate({sprites, baseGeometry, textureAtlas});
          setInitialized(true);
        }
      } else if (textureAtlas && onCreate) {
        onCreate({sprites, baseGeometry});
        setInitialized(true);
      }
    }
  }, [isInitialized, textureAtlasName, textureAtlas, onCreate, sprites, baseGeometry, setInitialized]);

  return <></>;
}

Sprites.propTypes = {
  onCreate: func,
  textureAtlas: string,
}

Sprites.defaultProps = {
  onCreate: undefined,
  textureAtlas: undefined,
}

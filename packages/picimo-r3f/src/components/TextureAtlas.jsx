import React from 'react';
import usePromise from 'react-promise-suspense';
import {TextureAtlas as PicimoTextureAtlas} from 'picimo';
import {string} from 'prop-types';

export const TextureAtlas = ({src, basePath, ...props}) => {

  const textureAtlas = usePromise(
    () => PicimoTextureAtlas.load(src, basePath),
    [src, basePath],
  );

  return <primitive object={textureAtlas} {...props}></primitive>;

}

TextureAtlas.propTypes = {
  src: string.isRequired,
  basePath: string,
}

TextureAtlas.defaultProps = {
  basePath: './',
}

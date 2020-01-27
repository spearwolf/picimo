import React from 'react';
import usePromise from 'react-promise-suspense';
import {TextureAtlas as PicimoTextureAtlas} from 'picimo';
import {string} from 'prop-types';
import {useTextureAtlas} from '../hooks';

export const TextureAtlas = ({src, basePath, name, ...props}) => {

  const [ , setTextureAtlas ] = useTextureAtlas(name);

  const textureAtlas = usePromise(
    () => setTextureAtlas(PicimoTextureAtlas.load(src, basePath)),
    [src, basePath, name],
  );

  return <primitive object={textureAtlas} {...props}></primitive>;

}

TextureAtlas.propTypes = {
  src: string.isRequired,
  basePath: string,
  name: string,
}

TextureAtlas.defaultProps = {
  basePath: './',
  name: 'default'
}

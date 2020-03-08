import {TextureAtlas as PicimoTextureAtlas} from 'picimo';
import {string} from 'prop-types';
import React, {useEffect} from 'react';
import usePromise from 'react-promise-suspense';

import {useTextureAtlas} from '../hooks';

export const TextureAtlas = ({src, basePath, name, ...props}) => {
  const alias = name ? name : basePath === './' ? src : `${basePath}${src}`;
  const [, setTextureAtlas] = useTextureAtlas(alias);

  const textureAtlas = usePromise(
    () => PicimoTextureAtlas.load(src, basePath),
    [src, basePath, name],
  );

  useEffect(
    () => {
      // the usePromise hook caches the promise response - so we need to call setTextureAtlas here
      setTextureAtlas(textureAtlas);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textureAtlas],
  );

  return <primitive object={textureAtlas} {...props}></primitive>;
};

// TODO add texture->webgl options (linear, nearest, flipY...)
TextureAtlas.propTypes = {
  src: string.isRequired,
  basePath: string,
  name: string,
};

TextureAtlas.defaultProps = {
  basePath: './',
};

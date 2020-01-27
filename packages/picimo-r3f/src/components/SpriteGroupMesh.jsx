import React, {forwardRef, Suspense} from 'react';
import {extend} from 'react-three-fiber';
import {SpriteGroupMesh as PicimoSpriteGroupMesh} from 'picimo';
import {node, any} from 'prop-types';
import {TextureContext, useTextureContext} from '../hooks/useTexture';

extend({PicimoSpriteGroupMesh});

export const SpriteGroupMesh = forwardRef(({ children, fallback, ...props }, ref) => {
  const texCtx = useTextureContext();
  return (
    <Suspense fallback={fallback}>
      <TextureContext.Provider value={texCtx}>
        <picimoSpriteGroupMesh ref={ref} {...props}>
          {children}
        </picimoSpriteGroupMesh>
      </TextureContext.Provider>
    </Suspense>
  )
});

SpriteGroupMesh.displayName = 'SpriteGroupMesh';

SpriteGroupMesh.propTypes = {
  children: node,
  fallback: any,
}

SpriteGroupMesh.defaultProps = {
  children: undefined,
  fallback: null,
}

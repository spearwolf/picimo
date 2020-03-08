import {SpriteGroupMesh as PicimoSpriteGroupMesh} from 'picimo';
import {node, any} from 'prop-types';
import React, {forwardRef, Suspense} from 'react';
import {extend} from 'react-three-fiber';

extend({PicimoSpriteGroupMesh});

export const SpriteGroupMesh = forwardRef(
  ({children, fallback, ...props}, ref) => (
    <Suspense fallback={fallback}>
      <picimoSpriteGroupMesh ref={ref} {...props}>
        {children}
      </picimoSpriteGroupMesh>
    </Suspense>
  ),
);

SpriteGroupMesh.displayName = 'SpriteGroupMesh';

SpriteGroupMesh.propTypes = {
  children: node,
  fallback: any,
};

SpriteGroupMesh.defaultProps = {
  children: undefined,
  fallback: null,
};

import React, {forwardRef} from 'react';
import {extend} from 'react-three-fiber';
import {SpriteGroupMesh as PicimoSpriteGroupMesh} from 'picimo';
import {node} from 'prop-types';

extend({PicimoSpriteGroupMesh});

export const SpriteGroupMesh = forwardRef(({ children, ...props }, ref) => (
  <picimoSpriteGroupMesh ref={ref} {...props}>
    {children}
  </picimoSpriteGroupMesh>
));

SpriteGroupMesh.displayName = 'SpriteGroupMesh';

SpriteGroupMesh.propTypes = {
  children: node,
}

SpriteGroupMesh.defaultProps = {
  children: undefined,
}

import React, {forwardRef} from 'react';
import {extend} from 'react-three-fiber';
import {SpriteGroupMesh as PicimoSpriteGroupMesh} from 'picimo';
import {node} from 'prop-types';

extend({PicimoSpriteGroupMesh});

// eslint-disable-next-line react/display-name
export const SpriteGroupMesh = forwardRef(({ children, ...props }, ref) => (
  <picimoSpriteGroupMesh ref={ref} {...props}>
    {children}
  </picimoSpriteGroupMesh>
));

SpriteGroupMesh.propTypes = {
  children: node,
  // ref
}

SpriteGroupMesh.defaultProps = {
  children: undefined,
  // ref
}

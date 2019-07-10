import { VODescriptor, VertexObject } from '../VODescriptor';

import { ISimpleSprite } from './ISimpleSprite';
import { SimpleSpriteMethods, SimpleSpriteMethodsType } from './SimpleSpriteMethods';

const SimpleSpriteDescription = {

  attributes: [{
    name: 'y',
  }, {
    name: 'pos',
    scalars: ['left', 'top', 'width', 'height'],
  }, {
    name: 'tex',
    scalars: ['originS', 'originT', 'maxS', 'maxT'],
  }],

  methods: SimpleSpriteMethods,

};

export type SimpleSpriteDescriptorType = VODescriptor<SimpleSpriteMethodsType, ISimpleSprite>;
export type SimpleSpriteVertexObject = VertexObject<SimpleSpriteMethodsType, ISimpleSprite>;

let g_simpleSpriteDescriptor: SimpleSpriteDescriptorType = null;

export const getSimpleSpriteDescriptor = () => {
  if (g_simpleSpriteDescriptor == null) {
    g_simpleSpriteDescriptor = new VODescriptor<SimpleSpriteMethodsType, ISimpleSprite>(SimpleSpriteDescription);
  }
  return g_simpleSpriteDescriptor;
};

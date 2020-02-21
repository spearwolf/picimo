import { VODescriptor, VertexObject } from '../VODescriptor';

import { IAdvancedSpriteBase } from './IAdvancedSpriteBase';
import { AdvancedSpriteBaseMethodsType, AdvancedSpriteBaseMethods } from './AdvancedSpriteBaseMethods';

const AdvancedSpriteBaseDescription = {

  vertexCount: 4,

  attributes: [{
    name: 'position',
    scalars: ['x', 'y'],
  }, {
    name: 'uv',
    scalars: ['s', 't'],
  }],

  methods: AdvancedSpriteBaseMethods,

};

export type AdvancedSpriteBaseDescriptorType = VODescriptor<AdvancedSpriteBaseMethodsType, IAdvancedSpriteBase>;
export type AdvancedSpriteBaseVertexObject = VertexObject<AdvancedSpriteBaseMethodsType, IAdvancedSpriteBase>;

let g_advancedSpriteBaseDescriptor: AdvancedSpriteBaseDescriptorType = null;

export const getAdvancedSpriteBaseDescriptor = () => {
  if (g_advancedSpriteBaseDescriptor == null) {
    g_advancedSpriteBaseDescriptor = new VODescriptor<AdvancedSpriteBaseMethodsType, IAdvancedSpriteBase>(AdvancedSpriteBaseDescription);
  }
  return g_advancedSpriteBaseDescriptor;
};

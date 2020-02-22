import {VODescriptor, VertexObject} from '../VODescriptor';

import {ISimpleSpriteBase} from './ISimpleSpriteBase';
import {
  SimpleSpriteBaseMethodsType,
  SimpleSpriteBaseMethods,
} from './SimpleSpriteBaseMethods';

const SimpleSpriteBaseDescription = {
  vertexCount: 4,

  attributes: [
    {
      name: 'position',
      scalars: ['x', 'z'],
    },
    {
      name: 'uv',
      scalars: ['s', 't'],
    },
  ],

  methods: SimpleSpriteBaseMethods,
};

export type SimpleSpriteBaseDescriptorType = VODescriptor<
  SimpleSpriteBaseMethodsType,
  ISimpleSpriteBase
>;
export type SimpleSpriteBaseVertexObject = VertexObject<
  SimpleSpriteBaseMethodsType,
  ISimpleSpriteBase
>;

let gSimpleSpriteBaseDescriptor: SimpleSpriteBaseDescriptorType = null;

export const getSimpleSpriteBaseDescriptor = () => {
  if (gSimpleSpriteBaseDescriptor == null) {
    gSimpleSpriteBaseDescriptor = new VODescriptor<
      SimpleSpriteBaseMethodsType,
      ISimpleSpriteBase
    >(SimpleSpriteBaseDescription);
  }
  return gSimpleSpriteBaseDescriptor;
};

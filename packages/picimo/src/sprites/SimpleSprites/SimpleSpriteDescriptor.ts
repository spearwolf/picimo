import {VODescriptor, VertexObject} from '../VODescriptor';

import {ISimpleSprite} from './ISimpleSprite';
import {
  SimpleSpriteMethods,
  SimpleSpriteMethodsType,
} from './SimpleSpriteMethods';

const SimpleSpriteDescription = {
  attributes: [
    {
      name: 'y',
    },
    {
      name: 'pos',
      scalars: ['left', 'top', 'width', 'height'],
    },
    {
      name: 'tex',
      scalars: ['originS', 'originT', 'maxS', 'maxT'],
    },
  ],

  methods: SimpleSpriteMethods,
};

export type SimpleSpriteDescriptorType = VODescriptor<
  SimpleSpriteMethodsType,
  ISimpleSprite
>;
export type SimpleSpriteVertexObject = VertexObject<
  SimpleSpriteMethodsType,
  ISimpleSprite
>;

let gSimpleSpriteDescriptor: SimpleSpriteDescriptorType = null;

export const getSimpleSpriteDescriptor = () => {
  if (gSimpleSpriteDescriptor == null) {
    gSimpleSpriteDescriptor = new VODescriptor<
      SimpleSpriteMethodsType,
      ISimpleSprite
    >(SimpleSpriteDescription);
  }
  return gSimpleSpriteDescriptor;
};

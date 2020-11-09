import {VODescriptor, VertexObject} from '../VODescriptor';

import {ISimpleSprite} from './ISimpleSprite';
import {
  SimpleSpriteMethods,
  SimpleSpriteMethodsType,
} from './SimpleSpriteMethods';

const SimpleSpriteDescription = {
  //
  // +----+-------------------+-------------------+
  // | y  | [pos]             | [tex]             |
  // +----+-------------------+-------------------+
  //
  // +----+----+----+----+----+----+----+----+----+
  // | y  | lef| top| wid| hei| o~S| o~T| m~S| m~T|
  // +----+----+----+----+----+----+----+----+----+
  //
  // <--------------------------------------------> descriptor.bytesPerVertex = 36
  //
  //                                                attr(y)
  // <---->                                         .bytesPerVertex = 4
  // >                                              .byteOffset = 0
  // >                                              .offset = 0
  //
  //                                                attr(pos)
  //      <------------------->                     .bytesPerVertex = 16
  // ----->                                         .byteOffset = 4
  // ----->                                         .offset = 1
  //
  //                                                attr(tex)
  //                          <-------------------> .bytesPerVertex = 16
  // ------------------------->                     .byteOffset = 20
  // ------------------------->                     .offset = 5
  //
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

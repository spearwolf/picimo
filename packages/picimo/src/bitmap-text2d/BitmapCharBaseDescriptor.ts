import {VODescriptor, VertexObject} from '../sprites';

import {BitmapCharBase} from './BitmapCharBase';
import {
  BitmapCharBaseMethodsType,
  BitmapCharBaseMethods,
} from './BitmapCharBaseMethods';

const BitmapCharBaseDescription = {
  vertexCount: 4,

  attributes: [
    {
      name: 'position',
      scalars: ['x', 'y'],
    },
    {
      name: 'uv',
      scalars: ['s', 't'],
    },
  ],

  methods: BitmapCharBaseMethods,
};

export type BitmapCharBaseDescriptorType = VODescriptor<
  BitmapCharBaseMethodsType,
  BitmapCharBase
>;
export type BitmapCharBaseVertexObject = VertexObject<
  BitmapCharBaseMethodsType,
  BitmapCharBase
>;

let gBitmapCharBaseDescriptor: BitmapCharBaseDescriptorType = null;

export const getBitmapCharBaseDescriptor = () => {
  if (gBitmapCharBaseDescriptor == null) {
    gBitmapCharBaseDescriptor = new VODescriptor<
      BitmapCharBaseMethodsType,
      BitmapCharBase
    >(BitmapCharBaseDescription);
  }
  return gBitmapCharBaseDescriptor;
};

import { VODescriptor, VertexObject } from '../../sprites';

import { BitmapCharBase } from './BitmapCharBase';
import { BitmapCharBaseMethodsType, BitmapCharBaseMethods } from './BitmapCharBaseMethods';

const BitmapCharBaseDescription = {

  vertexCount: 4,

  attributes: [{
    name: 'position',
    scalars: ['x', 'y'],
  }, {
    name: 'uv',
    scalars: ['s', 't'],
  }],

  methods: BitmapCharBaseMethods,

};

export type BitmapCharBaseDescriptorType = VODescriptor<BitmapCharBaseMethodsType, BitmapCharBase>;
export type BitmapCharBaseVertexObject = VertexObject<BitmapCharBaseMethodsType, BitmapCharBase>;

let g_bitmapCharBaseDescriptor: BitmapCharBaseDescriptorType = null;

export const getBitmapCharBaseDescriptor = () => {
  if (g_bitmapCharBaseDescriptor == null) {
    g_bitmapCharBaseDescriptor = new VODescriptor<BitmapCharBaseMethodsType, BitmapCharBase>(BitmapCharBaseDescription);
  }
  return g_bitmapCharBaseDescriptor;
};

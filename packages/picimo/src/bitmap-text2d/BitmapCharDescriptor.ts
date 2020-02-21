import { VODescriptor, VertexObject } from '../sprites';

import { BitmapChar } from './BitmapChar';
import { BitmapCharMethods, BitmapCharMethodsType } from './BitmapCharMethods';

const BitmapCharDescription = {

  attributes: [{
    name: 'zPos',
  }, {
    name: 'baselineOffset'
  }, {
    name: 'pos',
    scalars: ['originX', 'originY', 'width', 'height'],
  }, {
    name: 'tex',
    scalars: ['originS', 'originT', 'maxS', 'maxT'],
  }],

  methods: BitmapCharMethods,

};

export type BitmapCharDescriptorType = VODescriptor<BitmapCharMethodsType, BitmapChar>;
export type BitmapCharVertexObject = VertexObject<BitmapCharMethodsType, BitmapChar>;

let g_bitmapCharDescriptor: BitmapCharDescriptorType = null;

export const getBitmapCharDescriptor = () => {
  if (g_bitmapCharDescriptor == null) {
    g_bitmapCharDescriptor = new VODescriptor<BitmapCharMethodsType, BitmapChar>(BitmapCharDescription);
  }
  return g_bitmapCharDescriptor;
};

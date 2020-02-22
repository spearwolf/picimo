import {VODescriptor, VertexObject} from '../../sprites';

import {ITileQuadBase} from './ITileQuadBase';
import {
  TileQuadBaseMethodsType,
  TileQuadBaseMethods,
} from './TileQuadBaseMethods';

const TileQuadBaseDescription = {
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

  methods: TileQuadBaseMethods,
};

export type TileQuadBaseDescriptorType = VODescriptor<
  TileQuadBaseMethodsType,
  ITileQuadBase
>;
export type TileQuadBaseVertexObject = VertexObject<
  TileQuadBaseMethodsType,
  ITileQuadBase
>;

let gTileQuadBaseDescriptor: TileQuadBaseDescriptorType = null;

export const getTileQuadBaseDescriptor = () => {
  if (gTileQuadBaseDescriptor == null) {
    gTileQuadBaseDescriptor = new VODescriptor<
      TileQuadBaseMethodsType,
      ITileQuadBase
    >(TileQuadBaseDescription);
  }
  return gTileQuadBaseDescriptor;
};

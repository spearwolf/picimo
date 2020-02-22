import {VODescriptor, VertexObject} from '../../sprites';

import {ITileQuad} from './ITileQuad';
import {TileQuadMethods, TileQuadMethodsType} from './TileQuadMethods';

const TileQuadDescription = {
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

  methods: TileQuadMethods,
};

export type TileQuadDescriptorType = VODescriptor<
  TileQuadMethodsType,
  ITileQuad
>;
export type TileQuadVertexObject = VertexObject<TileQuadMethodsType, ITileQuad>;

let gTileQuadDescriptor: TileQuadDescriptorType = null;

export const getTileQuadDescriptor = () => {
  if (gTileQuadDescriptor == null) {
    gTileQuadDescriptor = new VODescriptor<TileQuadMethodsType, ITileQuad>(
      TileQuadDescription,
    );
  }
  return gTileQuadDescriptor;
};

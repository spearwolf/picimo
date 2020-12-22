import {ITileSet} from '../textures';

import {readOption} from '../utils';

import {IMap2DLayerData, IViewCullingThreshold} from './IMap2DLayerData';

export type LIMITATION_TO_ONE_AXIS = 'horizontal' | 'vertical' | 'none';

export interface IRepeatingPatternLayerOptions {
  limitToOneAxis?: LIMITATION_TO_ONE_AXIS;
}

export class RepeatingPatternLayer implements IMap2DLayerData {
  static fromTile(
    tileset: ITileSet,
    tileId: number,
    options?: IRepeatingPatternLayerOptions,
  ) {
    const {width, height} = tileset.getTextureById(tileId);
    return new RepeatingPatternLayer(width, height, tileId, options);
  }

  readonly name = 'repeating-patterns';

  readonly tileWidth: number;
  readonly tileHeight: number;

  readonly viewCullingThreshold: IViewCullingThreshold = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  readonly pattern: number;

  limitToOneAxis: LIMITATION_TO_ONE_AXIS;

  constructor(
    tileWidth: number,
    tileHeight: number,
    pattern: number,
    options?: IRepeatingPatternLayerOptions,
  ) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.pattern = pattern;
    this.limitToOneAxis = readOption(
      options,
      'limitToOneAxis',
      'none',
    ) as LIMITATION_TO_ONE_AXIS;
  }

  getTileIdsWithin(
    _left: number,
    top: number,
    width: number,
    height: number,
    arr?: Uint32Array,
  ) {
    const uints = arr || new Uint32Array(width * height);
    switch (this.limitToOneAxis) {
      case 'vertical':
      // TODO limit to vertical axis
      case 'horizontal':
        if (top >= 1 || top + height < 0) {
          uints.fill(0);
        } else if (top === 0) {
          uints.fill(this.pattern, 0, width);
          uints.fill(0, width);
        } else {
          uints.fill(0, 0, -top * width);
          uints.fill(this.pattern, -top * width, (-top + 1) * width);
          uints.fill(0, (-top + 1) * width);
        }
        break;
      case 'none':
      default:
        uints.fill(this.pattern);
    }
    return uints;
  }
}

import { IMap2DLayerData, IViewCullingThreshold } from './IMap2DLayerData';

export class RepeatingPatternLayer implements IMap2DLayerData {

  readonly name = 'repeating-patterns';

  readonly tileWidth: number;
  readonly tileHeight: number;

  readonly viewCullingThreshold: IViewCullingThreshold = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  pattern: number /* | Uint32Array*/;

  constructor(tileWidth: number, tileHeight: number, pattern: number /*| Uint32Array*/) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.pattern = pattern;
  }

  getTileIdsWithin(_left: number, _top: number, width: number, height: number, arr?: Uint32Array) {
    const uints = arr || new Uint32Array(width * height);
    // TODO fill uints array with pattern
    return uints;
  }

}

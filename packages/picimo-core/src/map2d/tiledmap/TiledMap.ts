import { Vector3 } from 'three';

import { Map2D } from '../three';
import { readOption } from '../../utils';
import { TileSet } from '../../textures';

import { ITiledMapData } from './ITiledMapData';
import { ITiledMapLayerData } from './ITiledMapLayerData';
import { Map2DView } from '../Map2DView';
import { TiledMapLayer } from './TiledMapLayer';
import { IMap2DLayer } from '../three/IMap2DLayer';
import { Map2DViewLayer } from '../Map2DViewLayer';

const Y_START = 0;
const Y_OFFSET = 10;

const $data = Symbol('data');
const $layerMap = Symbol('layerMap');

export interface TiledMapCreateLayersOptions {

  layers?: string[];

  yStart?: number;
  yOffset?: number;

}

export class TiledMap {

  static async load(url: string): Promise<TiledMap> {
    return new TiledMap(await fetch(url).then((response) => response.json()));
  }

  readonly tilesets: Array<TileSet> = [];

  private readonly [$data]: ITiledMapData;

  private readonly [$layerMap]: Map<string, TiledMapLayer> = new Map();

  /**
   * Assume tiled map orientation is orthogonal and infinite is true.
   */
  constructor(data: ITiledMapData) {

    this[$data] = data;

    data.layers.forEach((layerData: ITiledMapLayerData) => {
      this[$layerMap].set(layerData.name, new TiledMapLayer(this, layerData));
    });

    if (!this.infinite) {
      throw new Error(`TiledMap: sorry only infinite === true maps are supported yet`);
    }
    if (this.orientation !== 'orthogonal') {
      throw new Error(`TiledMap: sorry only orientation === orthogonal maps are supported yet`);
    }
  }

  get orientation() { return this[$data].orientation; }
  get infinite() { return this[$data].infinite; }

  get tilewidth() { return this[$data].tilewidth; }
  get tileheight() { return this[$data].tileheight; }

  getLayer(name: string) { return this[$layerMap].get(name); }
  getAllLayers(): TiledMapLayer[] { return this[$data].layers.map(layer => this.getLayer(layer.name)); }

  async loadTileSets(basePath: string = './') {
    const tilesets = await Promise.all(this[$data].tilesets.map(tilesetInfo => TileSet.load(tilesetInfo.image, {
      basePath,
      name: tilesetInfo.name,
      tileWidth: tilesetInfo.tilewidth,
      tileHeight: tilesetInfo.tileheight,
      margin: tilesetInfo.margin,
      spacing: tilesetInfo.spacing,
      // padding: 0
      columns: tilesetInfo.columns,
      firstId: tilesetInfo.firstgid,
      tileCount: tilesetInfo.tilecount,
    })));
    this.tilesets.push(...tilesets.sort((a, b) => a.firstId - b.firstId));
    return this.tilesets;
  }

  createLayers(map2d: Map2D, map2dView: Map2DView, options?: TiledMapCreateLayersOptions) {
    const layerNames = readOption(options, 'layers') as string[];
    const layers = (layerNames && layerNames.map(name => this.getLayer(name)) || this.getAllLayers());
    const yOffset = readOption(options, 'yOffset', Y_OFFSET) as number;

    let y = readOption(options, 'yStart', Y_START) as number;

    layers.forEach(tiledMapLayer => {
      const hasYOffset = !isNaN(tiledMapLayer.yOffset);
      const tilesets = tiledMapLayer.filterTilesets(this.tilesets);

      let map2dLayer: IMap2DLayer;

      if (tiledMapLayer.visible || layerNames) {
        switch (tiledMapLayer.type) {

          case 'tilelayer':
            if (tilesets) {
              map2dLayer = map2d.createTileQuadMeshLayer(
                tilesets,
                new Vector3(0, hasYOffset ? tiledMapLayer.yOffset : y, 0),
              );
            }
            break;

          default:
            console.warn(`skipping unknown layer.type = "${tiledMapLayer.type}"`);
        }
      }

      if (map2dLayer) {
        map2dView.addLayer(new Map2DViewLayer(map2dView, map2dLayer, tiledMapLayer));

        if (!hasYOffset) {
          y += yOffset;
        }
      }
    });
  }

}

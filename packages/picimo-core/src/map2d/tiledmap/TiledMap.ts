import { TileSet } from '../../textures';

import { ITiledMapData } from './ITiledMapData';
import { ITiledMapLayerData } from './ITiledMapLayerData';
import { TiledMapLayer } from './TiledMapLayer';

const $data = Symbol('data');
const $layerMap = Symbol('layerMap');

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
  get renderorder() { return this[$data].renderorder; }
  get infinite() { return this[$data].infinite; }

  get tilewidth() { return this[$data].tilewidth; }
  get tileheight() { return this[$data].tileheight; }

  getLayer(name: string) { return this[$layerMap].get(name); }
  getAllLayers(): TiledMapLayer[] { return Array.from(this[$layerMap].values()); }

  async loadTileSets(basePath: string = './') {
    const tilesets = await Promise.all(this[$data].tilesets.map(tilesetInfo => TileSet.load(tilesetInfo.image, {
      basePath,
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

}

import * as THREE from 'three';

import { ImageSource, ITileSet } from '../../textures';

import { Map2DViewTile } from '../Map2DViewTile';

import { IMap2DLayer } from './IMap2DLayer';
import { TileQuadMaterial } from './TileQuadMaterial';
import { TileQuadMesh } from './TileQuadMesh';

const $obj3d = Symbol('obj3d');
const $material = Symbol('material');
const $texture = Symbol('texture');
const $tiles = Symbol('tiles');

const $destroyTile = Symbol('destroyTile');
const $createTileMesh = Symbol('createTileMesh');
const $meshCache = Symbol('meshCache');
const $pushToCache = Symbol('pushToCache');

function makeTexture(htmlElement: ImageSource) {

  const texture = new THREE.Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

const meshCacheKey = (uuid: string, capacity: number) => `${uuid}:${capacity}`;

/**
 * Represents a map2d layer.
 *
 * Each tile is rendered with the same material which is built upon the *base image* from the given [[ITileSet]].
 *
 * Internally a [[TileQuadMesh]] is used for the tiles.
 */

export class Map2DTileQuadsLayer implements IMap2DLayer {

  readonly tileset: ITileSet;

  private readonly [$obj3d]: THREE.Object3D = new THREE.Object3D();

  private readonly [$texture]: THREE.Texture;
  private readonly [$material]: TileQuadMaterial;

  private readonly [$tiles]: Map<string, TileQuadMesh> = new Map();

  private readonly [$meshCache]: Map<string, Array<TileQuadMesh>> = new Map();

  constructor(tileset: ITileSet) {

    this.tileset = tileset;

    const texture = makeTexture(tileset.getImageSource());
    this[$texture] = texture;
    this[$material] = new TileQuadMaterial(texture);

    // TODO allow multiple textures/materials per layer .. ?

  }

  getObject3D() {
    return this[$obj3d];
  }

  dispose() {
    Array.from(this[$tiles].values()).forEach((tile) => tile.geometry.dispose());
    this[$tiles].clear();

    Array.from(this[$meshCache].values()).forEach((meshCache) => meshCache.forEach(mesh => mesh.geometry.dispose()));
    this[$meshCache].clear();

    this[$texture].dispose();
    this[$material].dispose();
  }

  addViewTile(tile: Map2DViewTile) {
    const mesh = this[$createTileMesh](tile);
    if (mesh != null) {
      mesh.name = tile.id;
      this[$obj3d].add(mesh);
    }
  }

  removeViewTile(tileId: string) {
    const mesh = this[$destroyTile](tileId);
    if (mesh != null) {

      // remove mesh from map2d scene
      this[$obj3d].remove(mesh);

      this[$pushToCache](mesh);
    }
  }

  renderViewTile(_tile: Map2DViewTile) {
    // animate tiles?
  }

  /**
   * Add mesh to internal cache so it is ready for later reuse
   */
  private [$pushToCache](mesh: TileQuadMesh) {
    const cacheKey = meshCacheKey(mesh.material.uuid, mesh.tiles.capacity);
    const meshCache = this[$meshCache].get(cacheKey);
    if (meshCache) {
      meshCache.push(mesh);
    } else {
      this[$meshCache].set(cacheKey, [mesh]);
    }
  }

  private [$destroyTile](id: string): TileQuadMesh {
    const tiles = this[$tiles];
    if (tiles.has(id)) {
      const mesh = tiles.get(id);
      tiles.delete(id);
      return mesh;
    }
    return null;
  }

  private [$createTileMesh](viewTile: Map2DViewTile): TileQuadMesh {

    let mesh: TileQuadMesh = null;

    const material = this[$material];
    const capacity = viewTile.width * viewTile.height;
    const meshCache = this[$meshCache].get(meshCacheKey(material.uuid, capacity));

    // reuse a mesh from cache ..
    if (meshCache) {
      mesh = meshCache.shift();
    }

    // .. or create a new
    if (!mesh) {
      mesh = new TileQuadMesh(material, { capacity });
    }

    mesh.tiles.showTiles(viewTile, this.tileset);
    // mesh.updateBoundingSphere(viewTile);

    if (mesh.tiles.usedCount > 0) {
    
      this[$tiles].set(viewTile.id, mesh);
      return mesh;

    }

    // no tiles created, so we can push the mesh back to cache
    this[$pushToCache](mesh);
    return null;
  }
}

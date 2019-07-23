import * as THREE from 'three';

import { ImageSource, ITileSet } from '../../textures';

import { Map2DViewTile } from '../Map2DViewTile';

import { IMap2DLayer } from './IMap2DLayer';
import { TileQuadMaterial } from './TileQuadMaterial';
import { TileQuadMesh } from './TileQuadMesh';
import { TileQuadMeshCache } from './TileQuadMeshCache';

const $obj3d = Symbol('obj3d');
const $material = Symbol('material');
const $texture = Symbol('texture');
const $tiles = Symbol('tiles');

const $destroyTile = Symbol('destroyTile');
const $createTileMesh = Symbol('createTileMesh');
const $meshCache = Symbol('meshCache');

function makeTexture(htmlElement: ImageSource) {

  const texture = new THREE.Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

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

  private readonly [$meshCache]: TileQuadMeshCache;

  constructor(tileset: ITileSet, meshCache: TileQuadMeshCache) {

    this.tileset = tileset;
    this[$meshCache] = meshCache;

    const texture = makeTexture(tileset.getImageSource());
    this[$texture] = texture;
    this[$material] = new TileQuadMaterial(texture);

    // TODO allow multiple textures/materials per layer .. ?

  }

  getObject3D() {
    return this[$obj3d];
  }

  dispose() {
    Array.from(this[$tiles].values()).forEach(tile => this[$meshCache].pushBackToCache(tile));
    this[$tiles].clear();

    // TODO if meshCache is an externally created cache we shouldn't dispose here
    // this[$meshCache].dispose(mesh => mesh.geometry.dispose());

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

      // add mesh to cache so we can reuse it later
      this[$meshCache].pushBackToCache(mesh);
    }
  }

  renderViewTile(_tile: Map2DViewTile) {
    // animate tiles?
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

    const material = this[$material];
    const capacity = viewTile.width * viewTile.height;
    const mesh = this[$meshCache].createMesh(material, capacity);

    mesh.tiles.showTiles(viewTile, this.tileset);
    // TODO mesh.updateBoundingSphere(viewTile);

    if (mesh.tiles.usedCount > 0) {
    
      this[$tiles].set(viewTile.id, mesh);
      return mesh;

    }

    // no tiles created, so we can push the mesh back to cache
    this[$meshCache].pushBackToCache(mesh);
    return null;
  }
}

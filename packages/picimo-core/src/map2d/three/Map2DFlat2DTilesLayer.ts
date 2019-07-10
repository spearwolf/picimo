import * as THREE from 'three';

import { TextureLibrary } from '../../textures';

import { Map2DViewTile } from '../Map2DViewTile';

import { IMap2DLayer } from './IMap2DLayer';
import { Map2DTileBufferGeometry } from './Map2DTileBufferGeometry';

const $obj3d = Symbol('obj3d');
const $material = Symbol('material');
const $texture = Symbol('texture');
const $tiles = Symbol('tiles');

const $destroyTile = Symbol('destroyTile');
const $createTileMesh = Symbol('createTileMesh');

/**
 * Represents a map2d layer.
 *
 * Each tile is rendered with the same material which is built by the layer
 * upon the *base image* from the given [[TextureLibrary]].
 *
 * For each tile a [[Map2DTileBufferGeometryGeometry]] is created.
 */

export class Map2DFlat2DTilesLayer implements IMap2DLayer {

  readonly textureLibrary: TextureLibrary;

  private readonly [$obj3d]: THREE.Object3D = new THREE.Object3D();

  private readonly [$material]: THREE.Material;
  private readonly [$texture]: THREE.Texture;

  private readonly [$tiles]: Map<string, THREE.Mesh> = new Map();

  constructor(textureLibrary: TextureLibrary) {

    this.textureLibrary = textureLibrary;

    const texture = new THREE.Texture(textureLibrary.atlas.baseTexture.imgEl);
    texture.flipY = false;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    this[$texture] = texture;

    this[$material] = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture,
      transparent: true,
    });

  }

  getObject3D() {
    return this[$obj3d];
  }

  dispose() {
    const tiles = this[$tiles];
    Array.from(tiles.values()).forEach((tile) => {
      tile.geometry.dispose();
    });
    tiles.clear();

    this[$texture].dispose();
    this[$material].dispose();
  }

  addViewTile(tile: Map2DViewTile) {
    const mesh = this[$createTileMesh](tile);
    mesh.name = tile.id;
    this[$obj3d].add(mesh);
  }

  removeViewTile(tileId: string) {
    const mesh = this[$destroyTile](tileId);
    if (mesh !== null) {
      this[$obj3d].remove(mesh);
      mesh.geometry.dispose();
    }
  }

  renderViewTile(_tile: Map2DViewTile) {
    // console.log('[Map2DSceneTHREE] update grid-tile:', tile.id);
  }

  private [$destroyTile](id: string): THREE.Mesh {
    const tiles = this[$tiles];
    if (tiles.has(id)) {
      const mesh = tiles.get(id);
      tiles.delete(id);
      return mesh;
    }
    return null;
  }

  private [$createTileMesh](viewTile: Map2DViewTile): THREE.Mesh {
    const geometry = new Map2DTileBufferGeometry(viewTile, this.textureLibrary);
    const mesh = new THREE.Mesh(geometry, this[$material]);
    this[$tiles].set(viewTile.id, mesh);
    return mesh;
  }
}

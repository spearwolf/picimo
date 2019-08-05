import * as THREE from 'three';

import { ITileSet, Texture } from '../../textures';

import { Map2DViewTile } from '../Map2DViewTile';

import { IMap2DLayer } from './IMap2DLayer';
import { TileQuadMaterial } from './TileQuadMaterial';
import { TileQuadMesh } from './TileQuadMesh';
import { TileQuadMeshCache } from './TileQuadMeshCache';

const $obj3d = Symbol('obj3d');
const $materials = Symbol('materials');
const $textures = Symbol('textures');
const $tiles = Symbol('tiles');

const $destroyTile = Symbol('destroyTile');
const $createTileMesh = Symbol('createTileMesh');
const $meshCache = Symbol('meshCache');

function makeTexture(textureSource: Texture) {

  const texture = new THREE.Texture(textureSource.imgEl);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

const constructMeshName = (tileId: string, mesh: THREE.Mesh) => Array.isArray(mesh.material)
  ? `${tileId}[${mesh.material.map(mat => mat.uuid).join(',')}]`
  : `${tileId}[${mesh.material.uuid}`;

/**
 * Represents a map2d layer.
 *
 * Each tile is rendered with the same material which is built upon the *base image* from the given [[ITileSet]].
 *
 * Internally a [[TileQuadMesh]] is used for the tiles.
 */

export class Map2DTileQuadsLayer implements IMap2DLayer {

  readonly tilesets: ITileSet[];

  private readonly [$obj3d]: THREE.Object3D = new THREE.Object3D();

  private readonly [$textures]: THREE.Texture[] = [];
  private readonly [$materials]: TileQuadMaterial[] = [];

  private readonly [$tiles]: Map<string, TileQuadMesh[]> = new Map();

  // TODO how to clear/remove meshCache?
  private readonly [$meshCache]: TileQuadMeshCache;

  constructor(tilesets: ITileSet[], meshCache: TileQuadMeshCache) {

    this.tilesets = tilesets;
    this[$meshCache] = meshCache;

    // TODO use an external material(<- tileset) cache!

    tilesets.forEach(tileset => {
      const tex = makeTexture(tileset.getTextureSource());
      this[$textures].push(tex);
      this[$materials].push(new TileQuadMaterial(tex));
    });

  }

  getObject3D() {
    return this[$obj3d];
  }

  dispose() {
    Array.from(this[$tiles].values()).forEach(meshs => meshs.forEach(mesh => this[$meshCache].pushBackToCache(mesh)));
    this[$tiles].clear();

    // TODO if meshCache is an externally created cache we shouldn't dispose here
    // this[$meshCache].dispose(mesh => mesh.geometry.dispose());

    // TODO use an external material cache!
    this[$textures].forEach(tex => tex.dispose());
    this[$materials].forEach(mat => mat.dispose());
  }

  addViewTile(tile: Map2DViewTile) {
    const meshs = this[$createTileMesh](tile);
    if (meshs != null) {
      meshs.forEach(mesh => {
        mesh.name = constructMeshName(tile.id, mesh);
        this[$obj3d].add(mesh);
      });
    }
  }

  removeViewTile(tileId: string) {
    const meshs = this[$destroyTile](tileId);
    if (meshs != null) {
      meshs.forEach(mesh => {
        // remove mesh from map2d scene
        this[$obj3d].remove(mesh);
        // add mesh to cache so we can reuse it later
        this[$meshCache].pushBackToCache(mesh);
      });
    }
  }

  renderViewTile(_tile: Map2DViewTile) {
    // animate tiles?
  }

  private [$destroyTile](id: string): TileQuadMesh[] {
    const tiles = this[$tiles];
    if (tiles.has(id)) {
      const meshs = tiles.get(id);
      tiles.delete(id);
      return meshs;
    }
    return null;
  }

  private [$createTileMesh](viewTile: Map2DViewTile): TileQuadMesh[] {

    const materials = this[$materials];
    const capacity = viewTile.width * viewTile.height;
    const meshs: TileQuadMesh[] = [];

    materials.forEach((material, idx) => {
      const mesh = this[$meshCache].createMesh(material, capacity);

      mesh.tiles.showTiles(viewTile, this.tilesets[idx]);
      // TODO mesh.updateBoundingSphere(viewTile);

      if (mesh.tiles.usedCount > 0) {
        meshs.push(mesh);
      } else {
        // no tiles created, so we can push the mesh back to cache
        this[$meshCache].pushBackToCache(mesh);
      }
    });

    if (meshs.length > 0) {
      this[$tiles].set(viewTile.id, meshs);
      return meshs;
    }

    return null;
  }
}

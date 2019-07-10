import * as THREE from 'three';

import { Map2DViewTile } from '../Map2DViewTile';

import { IMap2DLayer } from './IMap2DLayer';

// ===========================================================
//
//   !!! WORK IN PROGRESS !!!
//
// ===========================================================

export class Map2DFlat2DTilesLayer implements IMap2DLayer {

  private readonly obj3d: THREE.Object3D = new THREE.Object3D();

  private readonly tiles: Map<string, THREE.Mesh> = new Map();

  // constructor(/* mesh library */) {
  // }

  getObject3D() {
    return this.obj3d;
  }

  dispose() {
    Array.from(this.tiles.values()).forEach((tile) => {
      tile.geometry.dispose(); // TODO check!
    });
    this.tiles.clear();
  }

  addViewTile(tile: Map2DViewTile) {
    const mesh = this.createTileMesh(tile);
    mesh.name = tile.id;
    this.obj3d.add(mesh);
  }

  removeViewTile(tileId: string) {
    const mesh = this.destroyTile(tileId);
    if (mesh !== null) {
      this.obj3d.remove(mesh);
      mesh.geometry.dispose(); // TODO check!
    }
  }

  renderViewTile(_tile: Map2DViewTile) {
    // console.log('[Map2DSceneTHREE] update grid-tile:', tile.id);
  }

  private destroyTile(id: string): THREE.Mesh {
    if (this.tiles.has(id)) {
      const mesh = this.tiles.get(id);
      this.tiles.delete(id);
      return mesh;
    }
    return null;
  }

  private createTileMesh(_viewTile: Map2DViewTile): THREE.Mesh {

    // TODO create mesh

    // this.tiles.set(viewTile.id, mesh);
    // return mesh;
    return null;
  }
}

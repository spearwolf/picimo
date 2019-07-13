import * as THREE from 'three';

import { IMap2DEvent } from './IMap2DEvent';
import { Map2D } from './Map2D';

export class Map2DViewFrame extends THREE.Object3D {

  readonly map2d: Map2D;

  color: number;

  yOffset: number;

  constructor(map2d: Map2D, color = 0xff0032, yOffset = 1) {
    super();

    this.map2d = map2d;

    this.color = color;
    this.yOffset = yOffset;

    const l = 0.5;
    const c = 0.02;
    const geometry = new THREE.Geometry();

    geometry.vertices.push(
      new THREE.Vector3(-l, 0, -l),
      new THREE.Vector3(l, 0, -l),
      new THREE.Vector3(l, 0, -l),
      new THREE.Vector3(l, 0, l),
      new THREE.Vector3(l, 0, l),
      new THREE.Vector3(-l, 0, l),
      new THREE.Vector3(-l, 0, l),
      new THREE.Vector3(-l, 0, -l),

      new THREE.Vector3(-c, 0, 0),
      new THREE.Vector3(c, 0, 0),

      new THREE.Vector3(0, 0, -c),
      new THREE.Vector3(0, 0, c),
    );

    const material = new THREE.LineBasicMaterial({ color: this.color });
    const lines = new THREE.LineSegments(geometry, material) ;
    this.add(lines);

    this.addEventListener(Map2D.BeginRenderEvent, (event: THREE.Event) => {
      const { view } = event as IMap2DEvent;
      this.updateView(view.centerX, view.centerY, view.width, view.height);
    });
  }

  /**
   * @param height the size along the z axis
   */
  updateView(x: number, z: number, width: number, height: number) {
    this.position.set(x, this.yOffset, z);
    this.scale.set(width, 1, height);
    this.matrixWorldNeedsUpdate = true;
  }
}

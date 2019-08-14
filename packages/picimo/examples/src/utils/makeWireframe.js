import * as THREE from 'three';

export const makeWireframe = (geometry, color = 0xffffff) => new THREE.LineSegments(
  new THREE.EdgesGeometry(geometry),
  new THREE.LineBasicMaterial({ color }),
);

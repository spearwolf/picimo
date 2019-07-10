/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';
import { Display } from '../../src';

const display = new Display(document.getElementById('container'), {
  alpha: false,
  clearColor: 'skyblue',
});

display.addEventListener('resize', (ev) => {
  console.log('Resize to:', ev);
})

const camera = new THREE.PerspectiveCamera(75, display.width / display.height, 0.1, 100);
camera.position.z = 30;
camera.position.y = 10;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const cube = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(10, 10, 10)),
  new THREE.LineBasicMaterial({ color: 0xffffff }),
);
scene.add(cube);

const timeUniform = { value: 50 };

// @ts-ignore
cube.material.onBeforeCompile = (shader) => {

  shader.uniforms.time = timeUniform;

  shader.vertexShader = `
    uniform float time;
    ${shader.vertexShader}
  `;

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    'vec3 transformed = vec3( position.x + (sin( time + position.y ) * 5.0) / 2.0, position.y, position.z );'
  );

};

const yAxis = new THREE.Vector3(0, 1, 0);

display.addEventListener('frame', ({ display, now, width, height, deltaTime }) => {

  timeUniform.value = 0.5 * now % Math.PI * 2;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  scene.rotateOnAxis(yAxis, deltaTime);

  display.renderer.render(scene, camera);

});

display.start();

console.log('display', display);
// @ts-ignore
window.display = display;

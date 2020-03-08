/* eslint-disable no-console */
import {Display, Stage2D, OrthographicProjection, Plane} from 'picimo';

const display = new Display(document.querySelector('[picimo]'));

const projection = new OrthographicProjection(Plane.XZ, {pixelZoom: 2});

display.stage = new Stage2D(projection);

display.start();

console.log(display);

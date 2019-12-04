import * as THREE from 'three';

import { VERSION } from 'picimo';

import { appendTo } from './utils/appendTo.js';

const println = appendTo('#output', '\n');

println(`THREE REVISION ${THREE.REVISION}`);
println(`picimo.VERSION ${VERSION}`);

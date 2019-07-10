import * as THREE from 'three';

import { VERSION } from '../../src';

import { appendTo } from './utils/appendTo.js';

const println = appendTo('#output', '\n');

println(`THREE REVISION ${THREE.REVISION}`);
println(`spearwolf.VERSION ${VERSION}`);

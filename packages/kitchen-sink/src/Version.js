import {VERSION} from 'picimo';
import * as THREE from 'three';

import {appendTo} from './utils/appendTo.js';

const println = appendTo('#output', '\n');

println(`THREE REVISION ${THREE.REVISION}`);
println(`picimo.VERSION ${VERSION}`);

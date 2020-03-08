import {hexCol2rgb, hexCol2rgba, toFloatColors} from 'picimo';

let r: number, g: number, b: number, a: number;

[r, g, b] = hexCol2rgb('ff0032');
[r, g, b, a] = hexCol2rgba('ff0032');
[r, g, b, a] = hexCol2rgba('ff0032', 128);

[r, g, b] = toFloatColors([r, g, b]);
[r, g, b, a] = toFloatColors([r, g, b, a]);

import {
  AABB2,
  findNextPowerOf2,
  isPowerOf2,
  makeCircleCoords,
  maxOf,
} from 'picimo';

let aabb2: AABB2 = new AABB2(1, 1, 1, 1);

aabb2 = aabb2.clone();

let x: number;

x = aabb2.left;
x = aabb2.right;
x = aabb2.top;
x = aabb2.bottom;

x = aabb2.centerX;
x = aabb2.centerY;

let b: boolean;

b = aabb2.isInside(0, 0);
b = aabb2.isIntersecting(aabb2);

b = aabb2.isNorthEast(1, 2);
b = aabb2.isNorthWest(1, 2);
b = aabb2.isSouthWest(1, 2);
b = aabb2.isSouthEast(1, 2);

let y: boolean;

x = findNextPowerOf2(23);
y = isPowerOf2(66);

let coords: Array<[number, number, number]>;

coords = makeCircleCoords(100);
coords = makeCircleCoords(100, 2);

x = maxOf(1, 1);

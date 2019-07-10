import {
  get,
  pick,
  sample,
  generateUuid,
} from '@picimo/core';

let x: number;
let y: boolean;

x = get({ foo: { bar: 666 }}, 'foo/bar') as number;
y = get({ foo: { bar: true }}, 'foo/bar') as boolean;

let o = {
  foo: {
    bar: 1,
  },
  plah: 666,
}

interface Plah {
  plah: number;
}

const pickPlah = pick<Plah>(['plah']);
const p: Plah = pickPlah(o);

x = sample<number>([1, 2, 3, 4]);

const s: string = generateUuid();

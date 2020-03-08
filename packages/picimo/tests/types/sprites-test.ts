import {VODescriptor, SpriteGroup, SpriteGroupBufferGeometry} from 'picimo';

interface Triangle {
  foo: (x: number) => number;
}

interface TriangleAttrs {
  x0: number;
}

let vod = new VODescriptor<Triangle, TriangleAttrs>({
  vertexCount: 3,

  methods: {
    foo(x: number) {
      return x * 2;
    },
  },

  attributes: {
    position: {scalars: ['x', 'y', 'z']},

    color: {scalars: ['r', 'g', 'a']},
  },
});

let triangle = vod.createVO();

let x: number;

x = triangle.foo(66);
x = triangle.x0;

vod = triangle.descriptor;

let numbers: number[];

numbers = triangle.toArray();
numbers = triangle.toArray(['position']);

const group = new SpriteGroup(vod, {capacity: 100});
triangle = group.createSprite(100, 100);
triangle.free();

const geometry = new SpriteGroupBufferGeometry(group);

const isSame =
  geometry.parameters.spriteGroup.descriptor === triangle.descriptor;

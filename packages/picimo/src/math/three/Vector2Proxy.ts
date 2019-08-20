import { Vector2, Vector3, Vector4 } from "three";

type VectorProp = 'x' | 'y' | 'z' | 'w' | 'width' | 'height';

const $proxy = Symbol('proxy');
const $props = Symbol('props');

export class Vector2Proxy extends Vector2 {

  private readonly [$proxy]: Vector4;
  private readonly [$props]: [VectorProp, VectorProp];

  constructor(proxy: Vector2 | Vector3 | Vector4, xProp: VectorProp, yProp: VectorProp) {
    super();

    this[$proxy] = proxy as Vector4;
    this[$props] = [xProp, yProp];

    Object.defineProperties(this, {
      x: {
        get: () => this[$proxy][ this[$props][0] ],
        set: (val: number) => { this[$proxy][ this[$props][0] ] = val; },
        enumerable: true,
      },
      y: {
        get: () => this[$proxy][ this[$props][1] ],
        set: (val: number) => { this[$proxy][ this[$props][1] ] = val; },
        enumerable: true,
      }
    });
  }

}

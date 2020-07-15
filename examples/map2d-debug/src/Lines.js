/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {VODescriptor, SpriteGroup, SpriteGroupBufferGeometry} from 'picimo';
import {LineSegments, LineBasicMaterial, Color} from 'three';

const makeLinesDescriptor = () =>
  new VODescriptor({
    vertexCount: 2,

    attributes: {
      position: ['x', 'y', 'z'],
      color: {scalars: ['r', 'g', 'b'], uniform: true},
    },

    methods: {
      setPosition(from, to) {
        this._setPosition(from[0], from[1], from[2], to[0], to[1], to[2]);
      },

      setColor(color) {
        const {r, g, b} = typeof color === 'number' ? new Color(color) : color;
        this._setColor(r, g, b);
      },
    },
  });

export class Lines extends SpriteGroup {
  constructor({color, ...spriteGroupOptions}) {
    super(makeLinesDescriptor(), {
      dynamic: true,
      autotouch: true,
      ...spriteGroupOptions,
    });
    this.color = new Color(color == null ? 0x000000 : color);
    const material = new LineBasicMaterial({vertexColors: true});
    const geometry = new SpriteGroupBufferGeometry(this);
    this.object3d = new LineSegments(geometry, material);
    this.object3d.frustumCulled = false;
    geometry.updateBeforeRenderObject(this.object3d);
  }

  createLine(from, to, color = this.color) {
    const line = this.createSprite();
    line.setPosition(from, to);
    line.setColor(color);
    return line;
  }
}

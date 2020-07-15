import {
  VODescriptor,
  VOIndices,
  SpriteGroup,
  SpriteGroupBufferGeometry,
} from 'picimo';
import {LineSegments, Sphere, Vector3, LineBasicMaterial} from 'three';

const makeLinesDescriptor = () =>
  new VODescriptor({
    vertexCount: 2,

    attributes: {
      position: ['x', 'y', 'z'],
    },
  });

export class Lines extends SpriteGroup {
  constructor({color, ...spriteGroupOptions}) {
    super(makeLinesDescriptor(), {
      dynamic: true,
      indices: VOIndices.buildLines,
      ...spriteGroupOptions,
    });
    const material = new LineBasicMaterial({color});
    const geometry = new SpriteGroupBufferGeometry(this);
    // geometry.boundingSphere = new Sphere(new Vector3(0, 0, 0), 1000); // TODO boundingSphere radius
    this.mesh = new LineSegments(geometry, material);
    // geometry.connectToObject3D(this.mesh);
    // this.mesh = geometry.createObject3D(LineSegments, material);
  }

  createLine(from, to) {
    const line = this.createSprite();
    line.setPosition(from[0], from[1], from[2], to[0], to[1], to[2]);
    return line;
  }
}

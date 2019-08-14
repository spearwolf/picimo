
/**
 * Element indices array with data description for triangular polygons
 */
export class VOIndices {

  /**
   * @example
   * // Create indices for 10x quads where each quad made up of 2x triangles (4x vertices and 6x indices)
   * const quadIndices = VOIndices.build(10, [0, 1, 2, 0, 2, 3], 4)
   * quadIndices.length        // => 60
   * quadIndices.itemCount     // => 6
   */

  static build(objectCount: number, indices: number[], stride: number, objectOffset = 0) {
    const arr = new VOIndices(objectCount, indices.length);

    for (let i = 0; i < objectCount; ++i) {
      for (let j = 0; j < indices.length; ++j) {
        arr.indices[(i * arr.itemCount) + j] = indices[j] + ((i + objectOffset) * stride);
      }
    }

    return arr;
  }

  static buildQuads(count: number) {
    return VOIndices.build(count, [0, 1, 2, 0, 2, 3], 4);
  }

  static buildTriangles(count: number) {
    return VOIndices.build(count, [0, 1, 2], 3);
  }

  objectCount: number;
  itemCount: number;
  length: number;

  indices: number[];

  constructor(objectCount: number, itemCount: number) {
    this.objectCount = objectCount;
    this.itemCount = itemCount;
    this.length = objectCount * itemCount;
    this.indices = new Array(this.length);
  }

}

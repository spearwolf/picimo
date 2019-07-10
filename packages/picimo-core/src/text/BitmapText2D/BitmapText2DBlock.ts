import { BitmapText2D } from './three/BitmapText2D';

import { BitmapCharVertexObject } from './BitmapCharDescriptor';
import { BitmapText2DAlignment } from './BitmapText2DAlignment';

export class BitmapText2DBlock {

  readonly bitmapText2D: BitmapText2D;

  text: string;
  sprites: BitmapCharVertexObject[];

  needsUpdate: boolean;

  private _x: number;
  private _y: number;
  private _z: number;

  private _maxWidth: number;

  private _align: BitmapText2DAlignment;

  constructor(bitmapText2D: BitmapText2D, x: number, y: number, z: number, maxWidth: number = 0, align: BitmapText2DAlignment = BitmapText2DAlignment.Left) {

    this.bitmapText2D = bitmapText2D;

    this.x = x;
    this.y = y;
    this.z = z;

    this.maxWidth = maxWidth;

    this.align = align;

    this.text = undefined;
    this.sprites = null;

  }

  get x() { return this._x; }
  get y() { return this._y; }
  get z() { return this._z; }

  get maxWidth() { return this._maxWidth; }

  get align() { return this._align; }

  set x(x: number) {
    if (this._x !== x) {
      this._x = x;
      this.needsUpdate = true;
    }
  }

  set y(y: number) {
    if (this._y !== y) {
      this._y = y;
      this.needsUpdate = true;
    }
  }

  set z(z: number) {
    if (this._z !== z) {
      this._z = z;
      this.needsUpdate = true;
    }
  }

  set maxWidth(maxWidth: number) {
    if (this._maxWidth !== maxWidth) {
      this._maxWidth = maxWidth;
      this.needsUpdate = true;
    }
  }

  set align(align: BitmapText2DAlignment) {
    if (this._align !== align) {
      this._align = align;
      this.needsUpdate = true;
    }
  }

  update(text?: string) {

    if (this.needsUpdate || this.text !== text) {

      this.needsUpdate = false;
      this.text = text;

      const { bitmapText2D, sprites: prevSprites } = this;

      if (typeof text === 'string' && text.length > 0) {

        this.sprites = bitmapText2D.drawText(text, this.x, this.y, this.z, this.maxWidth, this.align, prevSprites);

      } else {

        this.sprites = null;

      }

      if (Array.isArray(prevSprites) && prevSprites.length > 0) {

        bitmapText2D.bitmapChars.voPool.free(prevSprites);

      }

    }

  }
}

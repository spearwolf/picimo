import { BitmapText2D, TextAlignH, TextAlignV } from './three/BitmapText2D';
import { BitmapCharVertexObject } from './BitmapCharDescriptor';

export class BitmapText2DBlock {

  readonly bitmapText2D: BitmapText2D;

  text: string;
  sprites: BitmapCharVertexObject[];

  needsUpdate: boolean;

  private _x: number;
  private _y: number;
  private _z: number;

  private _maxWidth: number;

  private _hAlign: TextAlignH;
  private _vAlign: TextAlignV;

  constructor(bitmapText2D: BitmapText2D, position: [number, number, number], maxWidth: number = 0, hAlign: TextAlignH = 'left', vAlign: TextAlignV = 'baseline') {

    this.bitmapText2D = bitmapText2D;

    this.position = position;
    this.maxWidth = maxWidth;

    this.hAlign = hAlign;
    this.vAlign = vAlign;

    this.text = undefined;
    this.sprites = null;

  }

  get x() { return this._x; }
  get y() { return this._y; }
  get z() { return this._z; }

  get position() { return [this._x, this._y, this._z]; }

  get maxWidth() { return this._maxWidth; }

  get hAlign() { return this._hAlign; }
  get vAlign() { return this._vAlign; }

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

  set position([x, y, z]: [number, number, number]) {
    if (this._x !== x || this._y !== y || this._z !== z) {
      this._x = x;
      this._y = y;
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

  set hAlign(align: TextAlignH) {
    if (this._hAlign !== align) {
      this._hAlign = align;
      this.needsUpdate = true;
    }
  }

  set vAlign(align: TextAlignV) {
    if (this._vAlign !== align) {
      this._vAlign = align;
      this.needsUpdate = true;
    }
  }

  update(text?: string) {

    if (this.needsUpdate || this.text !== text) {

      this.needsUpdate = false;
      this.text = text;

      const { bitmapText2D, sprites: prevSprites } = this;

      if (typeof text === 'string' && text.length > 0) {

        this.sprites = bitmapText2D.drawText(text, this.x, this.y, this.z, this.maxWidth, this.hAlign, this.vAlign, prevSprites);

      } else {

        this.sprites = null;

      }

      if (Array.isArray(prevSprites) && prevSprites.length > 0) {

        bitmapText2D.bitmapChars.voPool.free(prevSprites);

      }

    }

  }

  clear() {
    this.update('');
  }

}

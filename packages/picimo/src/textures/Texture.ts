import { generateUuid } from '../utils';
import { ImageSource, PowerOf2Image } from './PowerOf2Image';

export type TextureImage = PowerOf2Image | ImageSource;
export type TextureSource = Texture | TextureImage;

function minS(t: Texture) {
  let { x } = t;
  let texture: Texture = t;

  while ((texture = texture.parent) != null) {
    x += texture.x;
  }

  return x / t.root.image.width;
}

function minT(t: Texture) {
  let { y } = t;
  let texture: Texture = t;

  while ((texture = texture.parent) != null) {
    y += texture.y;
  }

  return y / t.root.image.height;
}

function maxS(t: Texture) {
  let x = t.x + t.width;
  let texture: Texture = t;

  while ((texture = texture.parent) != null) {
    x += texture.x;
  }

  return x / t.root.image.width;
}

function maxT(t: Texture) {
  let y = t.y + t.height;
  let texture: Texture = t;

  while ((texture = texture.parent) != null) {
    y += texture.y;
  }

  return y / t.root.image.height;
}

export class Texture {

  static async load(url: string) {
    return new Texture(await new PowerOf2Image(url).loaded);
  }

  image: TextureImage = null;
  parent: Texture = null;

  x = 0;
  y = 0;

  flipH = false;
  flipV = false;

  private _width = 0;
  private _height = 0;

  private _uuid: string = null;

  private _features: Map<string, unknown> = null;

  constructor(source: TextureSource, width? :number, height?: number, x = 0, y = 0) {
    let w = width;
    let h = height;

    if (source instanceof Texture) {
      //
      // === Create Sub-Texture ===
      //
      this.parent = source;
      this.image = null;
    } else if (typeof source === 'object' && 'width' in source && 'height' in source) {
      //
      // === Create Texture from Image ===
      //
      this._uuid = generateUuid();
      this.image = source;
      this.parent = null;
      if ('origWidth' in source && 'origHeight' in source) {
        w = source.origWidth;
        h = source.origHeight;
      }
    } else if (source === undefined) {
      return; // do nothing here
    } else {
      throw new Error(`Texture() constructor panic: unexpected parameter {source: ${source}}`);
    }

    this._width = w;
    this._height = h;

    this.x = x;
    this.y = y;
  }

  clone() {
    const t = new Texture(undefined);
    t.image = this.image;
    t.parent = this.parent;
    t.x = this.x;
    t.y = this.y;
    t.flipH = this.flipH;
    t.flipV = this.flipV;
    t._width = this._width;
    t._height = this._height;
    if (t.parent == null) {
      t._uuid = generateUuid();
    }
    if (this._features) {
      t._features = new Map();
      Array.from(this._features.entries()).forEach(([key, val]) => t._features.set(key, val));
    }
    return t;
  }

  flipHorizontal() {
    this.flipH = !this.flipH;
    return this;
  }

  flipVertical() {
    this.flipV = !this.flipV;
    return this;
  }

  getFeature(name: string) {
    return this._features !== null ? this._features.get(name) : undefined;
  }

  setFeature(name: string, value: unknown) {
    if (this._features === null) {
      this._features = new Map();
    }
    this._features.set(name, value);
  }

  /**
   * @returns Uuid of the underlying image object. Sub-textures returns the uuid from their parents.
   */
  get uuid(): string {
    return this._uuid || this.parent.uuid;
  }

  get root(): Texture {
    return (this.parent && this.parent.root) || this;
  }

  get imgEl() {
    const { root } = this;
    if (root.image instanceof PowerOf2Image) {
      return root.image.imgEl;
    }
    return root.image;
  }

  get width(): number {
    return (typeof this._width === 'number'
      ? this._width
      : (this.image
        ? this.image.width
        : (this.parent
          ? this.root.width
          : 0
        )
      )
    );
  }

  set width(w) {
    this._width = w;
  }

  get height(): number {
    return (typeof this._height === 'number'
      ? this._height
      : (this.image
        ? this.image.height
        : (this.parent
          ? this.root.height
          : 0
        )
      )
    );
  }

  set height(h) {
    this._height = h;
  }

  get minS() {
    return this.flipH ? maxS(this) : minS(this);
  }

  get minT() {
    return this.flipV ? maxT(this) : minT(this);
  }

  get maxS() {
    return this.flipH ? minS(this) : maxS(this);
  }

  get maxT() {
    return this.flipV ? minT(this) : maxT(this);
  }
}

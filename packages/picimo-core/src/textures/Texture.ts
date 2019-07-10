import { ImageSource, PowerOf2Image } from './PowerOf2Image';

export type TextureImage = PowerOf2Image | ImageSource;
export type TextureSource = Texture | TextureImage;

export class Texture {

  static async load(url: string) {
    return new Texture(await new PowerOf2Image(url).loaded);
  }

  image: TextureImage = null;
  parent: Texture = null;

  x = 0;
  y = 0;

  private _width = 0;
  private _height = 0;

  private _features: Map<string, unknown> = null;

  constructor(source: TextureSource, width? :number, height?: number, x = 0, y = 0) {
    let w = width;
    let h = height;

    if (source instanceof Texture) {
      this.parent = source;
      this.image = null;
    } else if (typeof source === 'object' && 'width' in source && 'height' in source) {
      this.image = source;
      this.parent = null;
      if ('origWidth' in source && 'origHeight' in source) {
        w = source.origWidth;
        h = source.origHeight;
      }
    } else {
      throw new Error(`Texture() constructor panic: unexpected parameter {source: ${source}}`);
    }

    this._width = w;
    this._height = h;

    this.x = x;
    this.y = y;
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
    let { x } = this;
    let texture: Texture = this;

    while ((texture = texture.parent) != null) {
      x += texture.x;
    }

    return x / this.root.image.width;
  }

  get minT() {
    let { y } = this;
    let texture: Texture = this;

    while ((texture = texture.parent) != null) {
      y += texture.y;
    }

    return y / this.root.image.height;
  }

  get maxS() {
    let x = this.x + this.width;
    let texture: Texture = this;

    while ((texture = texture.parent) != null) {
      x += texture.x;
    }

    return x / this.root.image.width;
  }

  get maxT() {
    let y = this.y + this.height;
    let texture: Texture = this;

    while ((texture = texture.parent) != null) {
      y += texture.y;
    }

    return y / this.root.image.height;
  }
}

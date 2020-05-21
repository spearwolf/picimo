import {TextureFilter} from 'three';

export interface IThreeTextureOptions {
  filter?: TextureFilter;
  anisotrophy?: number;
  flipy?: boolean;
}

const FILTER = 'filter';
const ANISOTROPHY = 'anisotrophy';
const FLIPY = 'flipy';

export class ThreeTextureOptions implements IThreeTextureOptions {
  filter: TextureFilter = undefined;
  anisotrophy: number = undefined;
  flipy: boolean = undefined;

  constructor(props: IThreeTextureOptions) {
    Object.assign(this, props);
  }

  equals(props: IThreeTextureOptions) {
    return this.toString() === new ThreeTextureOptions(props).toString();
  }

  toString() {
    const keys = [
      [FILTER, this.filter],
      [ANISOTROPHY, this.anisotrophy],
      [FLIPY, this.flipy],
    ].filter(([_, val]) => val !== undefined);
    return keys.length
      ? `{${keys.map(([key, val]) => `"${key}":${val}`).join(',')}}`
      : '{}';
  }

  static fromString(str: string) {
    return new ThreeTextureOptions(
      JSON.parse(str.replace(':Infinity', ':"Infinity"')),
    );
  }
}

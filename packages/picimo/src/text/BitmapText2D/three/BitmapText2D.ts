import * as THREE from 'three';

import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../../../sprites';
import { TextureAtlas } from '../../../textures';
import { pick } from '../../../utils';

import { BitmapChar } from '../BitmapChar';
import { BitmapCharBase } from '../BitmapCharBase';
import { getBitmapCharBaseGroup } from '../BitmapCharBaseGroup';
import { BitmapCharBaseMethodsType } from '../BitmapCharBaseMethods';
import { BitmapCharGroup, BitmapCharGroupOptions } from '../BitmapCharGroup';
import { BitmapCharMethodsType } from '../BitmapCharMethods';
import { BitmapText2DLine } from '../BitmapText2DLine';
import { BitmapText2DMeasurement } from '../BitmapText2DMeasurement';
import { BitmapCharVertexObject } from '../BitmapCharDescriptor';

import { BitmapFontMaterial, BitmapFontShaderHooks } from './BitmapFontMaterial';

export type TextAlignH = 'left' | 'center' | 'right';
export type TextAlignV = 'top' | 'baseline' | 'center' | 'bottom';

function makeTexture(htmlElement: HTMLImageElement) {

  const texture = new THREE.Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

export interface BitmapText2DOptions extends BitmapCharGroupOptions, BitmapFontShaderHooks {
}

const pickShaderHooks = pick<BitmapFontShaderHooks>(['vertexShaderPreHook', 'vertexShaderTransformHook']);

const $fontAtlas = Symbol('fontAtlas');
const $shaderHooks = Symbol('shaderHooks');
const $readFontFeatures = Symbol('readFontFeatures');

export class BitmapText2D extends SpriteGroupMesh<BitmapCharMethodsType, BitmapChar, BitmapCharBaseMethodsType, BitmapCharBase> {

  bitmapChars: BitmapCharGroup;
  material: BitmapFontMaterial;
  texture: THREE.Texture;

  lineHeight: number;
  hSpacing: number;
  whiteSpaceWidth: number;

  onFontAtlasUpdate: (bitmapText2D: BitmapText2D) => void;

  private [$fontAtlas]: TextureAtlas;
  private [$shaderHooks]: BitmapFontShaderHooks;

  constructor(options?: BitmapText2DOptions) {

    const bitmapCharGroup = new BitmapCharGroup(options);
    const baseChars = getBitmapCharBaseGroup();
    const geometry = new SpriteGroupInstancedBufferGeometry(baseChars, bitmapCharGroup);

    super(geometry, undefined);

    this.bitmapChars = bitmapCharGroup;

    this.hSpacing = 1;

    this[$shaderHooks] = pickShaderHooks(options);

  }

  private [$readFontFeatures]() {

    const fontAtlas = this[$fontAtlas];

    this.lineHeight = fontAtlas.getFeature('lineHeight', this.lineHeight) as number;
    this.hSpacing = fontAtlas.getFeature('hSpacing', this.hSpacing) as number;
    this.whiteSpaceWidth = fontAtlas.getFeature('whiteSpaceWidth', this.whiteSpaceWidth) as number;

    if (isNaN(this.lineHeight) || this.lineHeight <= 0) {
      throw new Error(`[BitmapText2D] invalid meta.lineHeight: ${this.lineHeight}`);
    }
    if (isNaN(this.hSpacing)) {
      throw new Error(`[BitmapText2D] invalid meta.hSpacing: ${this.hSpacing}`);
    }
    if (isNaN(this.whiteSpaceWidth) || this.whiteSpaceWidth < 0) {
      throw new Error(`[BitmapText2D] invalid meta.whiteSpaceWidth:, ${this.whiteSpaceWidth}`);
    }

  }

  get fontAtlas() { return this[$fontAtlas]; }

  set fontAtlas(fontAtlas: TextureAtlas) {
    const prevAtlas = this[$fontAtlas];
    this[$fontAtlas] = fontAtlas;
    if (prevAtlas != fontAtlas) {
      if (fontAtlas) {
        this[$readFontFeatures]();
        this.disposeMaterial();
        this.texture = makeTexture(fontAtlas.baseTexture.imgEl as HTMLImageElement);
        this.material = new BitmapFontMaterial(this.texture, this[$shaderHooks]);
      }
      const {onFontAtlasUpdate} = this;
      if (onFontAtlasUpdate) {
        onFontAtlasUpdate(this);
      }
    }
  }

  drawText(
    text: string,
    x: number,
    y: number,
    z: number,
    maxWidth = 0.0,
    hAlign: TextAlignH = 'left',
    vAlign: TextAlignV = 'baseline',
    spriteCache: BitmapCharVertexObject[] = null,
  ) {
    return this.createText(this.measureText(text, maxWidth), x, y, z, hAlign, vAlign, spriteCache);
  }

  createText(
    measure: BitmapText2DMeasurement,
    x: number,
    y: number,
    z: number,
    hAlign: TextAlignH,
    vAlign: TextAlignV,
    spriteCache: BitmapCharVertexObject[] = null,
  ): BitmapCharVertexObject[] {

    const sprites: BitmapCharVertexObject[] = [];

    const { bitmapChars } = this;
    const { descriptor } = bitmapChars;

    const spritePool = spriteCache || [];

    if (measure.charCount > spritePool.length) {

      bitmapChars.voPool.multiAlloc(measure.charCount - spritePool.length, spritePool);

    }

    const isAlignCenter = hAlign === 'center';
    const isAlignRight = hAlign === 'right';

    for (let i = 0; i < measure.lines.length; i++) {

      const line = measure.lines[i];

      let lineX = x;

      if (isAlignCenter) {
        lineX -= line.lineWidth / 2.0;
      } else if (isAlignRight) {
        lineX -= line.lineWidth;
      }

      for (let j = 0; j < line.chars.length; j++) {

        const char = line.chars[j];

        let sprite = spritePool.shift();

        const { tex } = char;

        bitmapChars.setSpriteSize(sprite, tex.width, tex.height, descriptor);
        bitmapChars.setTexCoordsByTexture(sprite, tex, descriptor);

        sprite.baselineOffset = char.bo;

        const tx = lineX + char.x;
        let ty = y + char.y;

        switch (vAlign) {
          case 'top':
            ty = ty - this.lineHeight;
            break;
          case 'bottom':
            ty = ty - this.lineHeight + measure.height;
            break;
          case 'center':
            ty = ty - this.lineHeight + (measure.height / 2);
            break;
          case 'baseline':
          default:
        }

        sprite.translate(tx, ty, z);

        sprites.push(sprite);

      }

    }

    return sprites;

  }

  measureText(text: string, maxWidth = 0): BitmapText2DMeasurement {

    const len = text.length;

    const lines: BitmapText2DLine[] = [{ lineWidth: 0, chars: [] }];
    let chars: BitmapText2DLine = lines[0];

    let charCount = 0;

    let cursor = { x: 0, y: 0 };

    let maxLineWidth = 0;
    let lineWidth = 0;

    const makeNewLine = () => {

      cursor.x = 0;
      cursor.y -= this.lineHeight;

      chars.lineWidth = lineWidth;

      chars = { lineWidth: 0, chars: [] };
      lines.push(chars);

      if (lineWidth > maxLineWidth) {
        maxLineWidth = lineWidth;
      }

      lineWidth = 0;

    };

    for (let i = 0; i < len; i++) {

      const c = text[i];

      if (c === ' ') {

        cursor.x += this.whiteSpaceWidth;

        if (maxWidth > 0 && cursor.x >= maxWidth) {
          makeNewLine();
        }

      } else if (c === '\n') {

        makeNewLine();

      } else {

        const tex = this.fontAtlas.frame(c);

        if (tex !== undefined) {

          const { width } = tex;
          const baselineOffset = tex.getFeature('baselineOffset') as number || 0;

          if (maxWidth > 0  && (cursor.x + width) >= maxWidth) {
            makeNewLine();
          }

          chars.chars.push({ tex, x: cursor.x, y: cursor.y, bo: baselineOffset });
          ++charCount;

          lineWidth = cursor.x + width;

          cursor.x += width + this.hSpacing;

        }

      }

    }

    chars.lineWidth = lineWidth;

    if (lineWidth > maxLineWidth) {
      maxLineWidth = lineWidth;
    }

    return {

      lines,
      maxLineWidth,
      charCount,

      height: lines.length * this.lineHeight,

    };

  }

  disposeMaterial() {
    if (this.material) {
      this.material.dispose();
    }
    if (this.texture) {
      this.texture.dispose();
    }
    this.material = undefined;
    this.texture = undefined;
  }

}

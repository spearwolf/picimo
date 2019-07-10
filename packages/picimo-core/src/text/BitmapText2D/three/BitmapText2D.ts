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
import { BitmapText2DAlignment } from '../BitmapText2DAlignment';
import { BitmapText2DLine } from '../BitmapText2DLine';
import { BitmapText2DMeasurement } from '../BitmapText2DMeasurement';
import { BitmapCharVertexObject } from '../BitmapCharDescriptor';

import { BitmapFontMaterial, BitmapFontShaderHooks } from './BitmapFontMaterial';

function makeTexture(htmlElement: HTMLImageElement) {

  const texture = new THREE.Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

const pickShaderHooks = pick(['vertexShaderPreHook', 'vertexShaderTransformHook']);

export interface BitmapText2DOptions extends BitmapCharGroupOptions, BitmapFontShaderHooks {
}

export class BitmapText2D extends SpriteGroupMesh<BitmapCharMethodsType, BitmapChar, BitmapCharBaseMethodsType, BitmapCharBase> {

  fontAtlas: TextureAtlas;
  bitmapChars: BitmapCharGroup;
  material: BitmapFontMaterial;

  lineHeight: number;
  hSpacing: number;
  whiteSpaceWidth: number;

  constructor(fontAtlas: TextureAtlas, options?: BitmapText2DOptions) {

    const bitmapCharGroup = new BitmapCharGroup(options);
    const baseChars = getBitmapCharBaseGroup();
    const geometry = new SpriteGroupInstancedBufferGeometry(baseChars, bitmapCharGroup);
    const material = new BitmapFontMaterial(
      makeTexture(fontAtlas.baseTexture.imgEl as HTMLImageElement),
      pickShaderHooks(options),
    );

    super(geometry, material);

    this.fontAtlas = fontAtlas;
    this.bitmapChars = bitmapCharGroup;
    this.material = material;

    this.type = 'BitmapText2D';

    this.lineHeight = fontAtlas.getFeature('lineHeight') as number;
    this.hSpacing = fontAtlas.getFeature('hSpacing') as number || 1;
    this.whiteSpaceWidth = fontAtlas.getFeature('whiteSpaceWidth') as number;

  }

  drawText(text: string, x: number, y: number, z: number, maxWidth = 0.0, align: BitmapText2DAlignment = BitmapText2DAlignment.Left, spriteCache: BitmapCharVertexObject[] = null) {
    return this.createText(this.measureText(text, maxWidth), x, y, z, align, spriteCache);
  }

  createText(measure: BitmapText2DMeasurement, x: number, y: number, z: number, align: BitmapText2DAlignment, spriteCache: BitmapCharVertexObject[] = null): BitmapCharVertexObject[] {

    const sprites: BitmapCharVertexObject[] = [];

    const { bitmapChars } = this;
    const { descriptor } = bitmapChars;

    const spritePool = spriteCache || [];

    if (measure.charCount > spritePool.length) {

      bitmapChars.voPool.multiAlloc(measure.charCount - spritePool.length, spritePool);

    }

    for (let i = 0; i < measure.lines.length; i++) {

      const line = measure.lines[i];

      let lineX = x;

      if (align === BitmapText2DAlignment.Center) {
        lineX -= line.lineWidth / 2.0;
      } else if (align === BitmapText2DAlignment.Right) {
        lineX -= line.lineWidth;
      }

      for (let j = 0; j < line.chars.length; j++) {

        const char = line.chars[j];

        let sprite = spritePool.shift();

        const { tex } = char;

        bitmapChars.setSpriteSize(sprite, tex.width, tex.height, descriptor);
        bitmapChars.setTexCoordsByTexture(sprite, tex, descriptor);

        sprite.baselineOffset = char.bo;

        sprite.translate(lineX + char.x, y + measure.height - char.y, z);

        sprites.push(sprite);

      }

    }

    return sprites;

  }

  measureText(text: string, maxWidth = 0.0): BitmapText2DMeasurement {

    const len = text.length;

    const lines: BitmapText2DLine[] = [{ lineWidth: 0, chars: [] }];
    let chars: BitmapText2DLine = lines[0];

    let charCount = 0;

    let cursor = { x: 0, y: 0 };

    let maxLineWidth = 0;
    let lineWidth = 0;

    const makeNewLine = () => {

      cursor.x = 0;
      cursor.y += this.lineHeight;

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

}

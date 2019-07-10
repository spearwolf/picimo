import { BitmapText2DLine } from './BitmapText2DLine';

export interface BitmapText2DMeasurement {
  height: number;
  maxLineWidth: number;
  charCount: number;

  lines: BitmapText2DLine[];

}

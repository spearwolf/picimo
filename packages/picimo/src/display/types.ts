import {Scene, Camera} from 'three';

import {Display} from './Display';
import {IConfigurator} from './IConfigurator';

export interface IDisplayEventParameters {
  display: Display;
  stage: IStage2D;
  width: number;
  height: number;
}

export interface IDisplayOnInitParameters extends IDisplayEventParameters {}
export interface IDisplayOnResizeParameters extends IDisplayEventParameters {}

export interface IDisplayOnFrameParamters extends IDisplayEventParameters {
  now: number;
  deltaTime: number;
  frameNo: number;
}

export interface IStage2D {
  scene: Scene;

  readonly camera: Camera;

  readonly width: number;
  readonly height: number;

  resize(params: IDisplayOnResizeParameters): void;
  frame(params: IDisplayOnFrameParamters): void;
}

export type DisplayGetSizeFn = (
  display: Display,
) => {width: number; height: number};

export type DisplayResizeStrategy =
  | HTMLElement
  | DisplayGetSizeFn
  | 'window'
  | 'fullscreen';

export enum DisplayMode {
  Pixelated = 'pixelated',
  AAQuality = 'antialias-quality',
  AAPerformance = 'antialias-performance',
}

export interface DisplayOptions {
  resizeStrategy?: DisplayResizeStrategy;

  mode?: DisplayMode;

  goFullscreenOnDeviceRotate?: boolean;

  /**
   * Set a custom [[IConfigurator]]. Will override the configurator from the `mode` option.
   */
  configurator?: IConfigurator;

  /**
   * Set a fixed device pixel ratio.
   * Otherwise DPR is read from [[IConfigurator]] or `window.devicePixelRatio`
   */
  pixelRatio?: number;

  clearColor?: number | string | THREE.Color;

  autoClear?: boolean;

  stage?: IStage2D;
}

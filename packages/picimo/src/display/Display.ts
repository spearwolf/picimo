import {Eventize} from 'eventize-js';

import {WebGLRendererParameters, WebGLRenderer, Color} from 'three';

import {Stage2D} from '../projection';
import {TextureFactory} from '../textures';
import {readOption, unpick, Stylesheets} from '../utils';

import {IConfigurator} from './IConfigurator';

import {AAPerformanceConfigurator} from './configurators/AAPerformanceConfigurator';
import {AAQualityConfigurator} from './configurators/AAQualityConfigurator';
import {PixelatedConfigurator} from './configurators/PixelatedConfigurator';

const $emitResize = Symbol('emitResize');
const $emitFrame = Symbol('emitFrame');
const $emitInit = Symbol('emitInit');
const $lockPixelRatio = Symbol('lockPixelRatio');
const $lastPixelRatio = Symbol('lastPixelRatio');
const $rafID = Symbol('rafID');
const $stage = Symbol('stage');
const $getEventOptions = Symbol('getEventOptions');

const INIT = 'init';
const FRAME = 'frame';
const RESIZE = 'resize';

const DISPLAY_MODE_ATTR = 'display-mode';
const RESIZE_STRATEGY_ATTR = 'resize-strategy';
const PIXEL_RATIO_ATTR = 'pixel-ratio';

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

  stage?: Stage2D;
}

const filterWebGLRendererParameters = unpick<WebGLRendererParameters>([
  'resizeStrategy',
  'pixelate',
  'clearColor',
  'scene',
  'canvas',
  'stage',
]);

const createConfigurator = (mode: DisplayMode) => {
  switch (mode) {
    case DisplayMode.AAQuality:
      return new AAQualityConfigurator();
    case DisplayMode.AAPerformance:
      return new AAPerformanceConfigurator();
    case DisplayMode.Pixelated:
    default:
      return new PixelatedConfigurator();
  }
};

export interface DisplayEventOptions {
  display: Display;

  width: number;
  height: number;

  stage: Stage2D;
}

export interface DisplayOnInitOptions extends DisplayEventOptions {}
export interface DisplayOnResizeOptions extends DisplayEventOptions {}

export interface DisplayOnFrameOptions extends DisplayEventOptions {
  now: number;
  deltaTime: number;
  frameNo: number;
}

const getAttribute = (el: HTMLElement, attrName: string): string => {
  const dataAttrName = `data-${attrName}`;
  if (el.hasAttribute(dataAttrName)) {
    return el.getAttribute(dataAttrName);
  }
  if (el.hasAttribute(attrName)) {
    return el.getAttribute(attrName);
  }
  return undefined;
};

export class Display extends Eventize {
  readonly renderer: WebGLRenderer;

  readonly canvas: HTMLCanvasElement;

  readonly textureFactory: TextureFactory;

  resizeStrategy: DisplayResizeStrategy;

  /**
   * _css_ pixels
   */
  width = 0;

  /**
   * _css_ pixels
   */
  height = 0;

  /**
   * Time in *seconds*.
   */
  now = 0;

  /**
   * The time in *seconds* as it was at the last call of `frame()`.
   */
  lastNow = 0;

  /**
   * Seconds passed since the last render / previous call to `frame()`.
   */
  deltaTime = 0;

  /**
   * Current frame number. Initially set to 0.
   */
  frameNo = 0;

  pause = false;

  private [$lockPixelRatio] = 0;
  private [$lastPixelRatio] = 0;

  private [$rafID] = 0;

  private [$stage]: Stage2D;

  constructor(
    el: HTMLElement,
    options?: DisplayOptions & WebGLRendererParameters,
  ) {
    super();

    let resizeRefEl: HTMLElement;

    if (el && el.tagName === 'CANVAS') {
      this.canvas = el as HTMLCanvasElement;
      resizeRefEl = el;
    } else {
      this.canvas = document.createElement('canvas');
      if (el instanceof HTMLElement) {
        el.appendChild(this.canvas);
        resizeRefEl = el;
      }
    }

    const configurator = readOption<DisplayOptions>(
      options,
      'configurator',
      () => {
        return createConfigurator(
          readOption<DisplayOptions>(
            options,
            'mode',
            getAttribute(el, DISPLAY_MODE_ATTR),
          ) as DisplayMode,
        );
      },
    ) as IConfigurator;

    const pixelRatio = Number(
      readOption<DisplayOptions>(
        options,
        'pixelRatio',
        parseInt((getAttribute(el, PIXEL_RATIO_ATTR) || 0) as any, 10),
      ),
    );

    this[$lockPixelRatio] =
      isNaN(pixelRatio) || pixelRatio < 1
        ? configurator.getPixelRatio()
        : pixelRatio;

    this.resizeStrategy = readOption<DisplayOptions>(
      options,
      'resizeStrategy',
      getAttribute(el, RESIZE_STRATEGY_ATTR) || resizeRefEl,
    ) as DisplayResizeStrategy;

    const renderParams: WebGLRendererParameters = {
      ...configurator.getWebGlRendererParameters(
        filterWebGLRendererParameters(options),
      ),
      canvas: this.canvas,
    };

    this.renderer = new WebGLRenderer(renderParams);

    const {domElement} = this.renderer;
    Stylesheets.addRule(domElement, 'picimo', `touch-action: none;`);
    domElement.setAttribute('touch-action', 'none'); // => PEP polyfill

    if (resizeRefEl && resizeRefEl.tagName !== 'CANVAS') {
      Stylesheets.addRule(
        resizeRefEl,
        'picimo-container',
        `
        font-size: 0;
      `,
      );
    }

    const containerOrCanvasEl = resizeRefEl || domElement;

    /*
    if (this.resizeStrategy === 'fullscreen') {
      Stylesheets.addRule(containerOrCanvasEl, 'picimo-fullscreen', `
        position: fixed;
        top: 0;
        left: 0;
      `);
    }
    */

    this.textureFactory = new TextureFactory(
      this.renderer,
      configurator.getTextureFactoryOptions(),
    );

    const clearColor = readOption<DisplayOptions>(
      options,
      'clearColor',
      new Color(),
    ) as Color | string;

    this.renderer.setClearColor(
      clearColor instanceof Color ? clearColor : new Color(clearColor),
      renderParams.alpha ? 0 : 1,
    );

    configurator.postSetup(this);

    this.stage = readOption<DisplayOptions>(options, 'stage') as Stage2D;

    this.resize();

    // on-rotate-go-fullscreen (experimental)
    if (this.resizeStrategy === 'fullscreen') {
      const {screen} = window;
      if (
        typeof screen !== 'undefined' &&
        typeof screen.orientation !== 'undefined'
      ) {
        screen.orientation.onchange = () => {
          if (screen.orientation.type.indexOf('landscape') !== -1) {
            if (typeof containerOrCanvasEl.requestFullscreen === 'function') {
              containerOrCanvasEl.requestFullscreen();
            }
          } else if (screen.orientation.type.indexOf('portrait') !== -1) {
            if (typeof document.exitFullscreen === 'function') {
              document.exitFullscreen();
            }
          }
        };
      }
    }
  }

  get stage(): Stage2D {
    return this[$stage];
  }

  set stage(stage: Stage2D) {
    const curStage = this[$stage];
    if (stage !== curStage) {
      if (curStage) {
        this.off(curStage);
      }
      this[$stage] = stage;
      if (stage) {
        this.on(stage);
        stage.resize(this[$getEventOptions]());
      }
    }
  }

  get pixelRatio(): number {
    return this[$lockPixelRatio] || window.devicePixelRatio || 1;
  }

  resize(): void {
    const {resizeStrategy} = this;

    let wPx = 320;
    let hPx = 200;

    if (resizeStrategy === 'fullscreen' || resizeStrategy === 'window') {
      wPx = window.innerWidth;
      hPx = window.innerHeight;
    } else if (typeof resizeStrategy === 'function') {
      const {width, height} = resizeStrategy(this);
      wPx = Math.floor(width);
      hPx = Math.floor(height);
    } else if (resizeStrategy instanceof HTMLElement) {
      const {width, height} = resizeStrategy.getBoundingClientRect();
      const styles = getComputedStyle(resizeStrategy, null);
      const verticalMargin =
        parseInt(styles.getPropertyValue('border-top-width'), 10) +
        parseInt(styles.getPropertyValue('border-bottom-width'), 10) +
        parseInt(styles.getPropertyValue('padding-top'), 10) +
        parseInt(styles.getPropertyValue('padding-bottom'), 10);
      const horizontalMargin =
        parseInt(styles.getPropertyValue('border-right-width'), 10) +
        parseInt(styles.getPropertyValue('border-left-width'), 10) +
        parseInt(styles.getPropertyValue('padding-left'), 10) +
        parseInt(styles.getPropertyValue('padding-right'), 10);
      wPx = Math.floor(width - horizontalMargin);
      hPx = Math.floor(height - verticalMargin);
    }

    const {pixelRatio} = this;

    if (
      pixelRatio !== this[$lastPixelRatio] ||
      wPx !== this.width ||
      hPx !== this.height
    ) {
      this.width = wPx;
      this.height = hPx;
      this[$lastPixelRatio] = pixelRatio;

      this.renderer.setPixelRatio(this.pixelRatio);
      this.renderer.setSize(wPx, hPx);

      if (this.frameNo > 0) {
        this[$emitResize](); // no need to emit this inside construction phase
      }
    }
  }

  renderFrame(now = window.performance.now()): void {
    this.lastNow = this.now;
    this.now = now / 1000.0;

    if (this.frameNo > 0) {
      this.deltaTime = this.now - this.lastNow;
    }

    this.resize();

    if (this.frameNo === 0) {
      this[$emitResize](); // always call resize before render the first frame!
    }

    this.renderer.clear(); // TODO add autoClear option?

    this[$emitFrame]();

    ++this.frameNo;
  }

  start(): void {
    this.pause = false;
    this[$emitInit]();

    const renderFrame = (now: number) => {
      if (!this.pause) {
        this.renderFrame(now);
      }
      this[$rafID] = window.requestAnimationFrame(renderFrame);
    };

    this[$rafID] = window.requestAnimationFrame(renderFrame);
  }

  stop(): void {
    window.cancelAnimationFrame(this[$rafID]);
  }

  private [$emitInit]() {
    this.emit(INIT, {
      ...this[$getEventOptions](),
    } as DisplayOnInitOptions);
  }

  /**
   * 1. emit 'resize' event
   * 2. resize stage projection
   */
  private [$emitResize]() {
    this.emit(RESIZE, this[$getEventOptions]() as DisplayOnResizeOptions);
  }

  /**
   * 1. emit 'frame' event
   * 2. render stage (if exists)
   */
  private [$emitFrame]() {
    this.emit(FRAME, {
      ...this[$getEventOptions](),

      now: this.now,
      deltaTime: this.deltaTime,
      frameNo: this.frameNo,
    } as DisplayOnFrameOptions);
  }

  private [$getEventOptions]() {
    const options: DisplayEventOptions = {
      display: this,

      width: this.width,
      height: this.height,

      stage: this.stage,
    };
    return options;
  }
}

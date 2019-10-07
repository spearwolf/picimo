import {WebGLRendererParameters, EventDispatcher, WebGLRenderer, Color} from 'three';

import {readOption, unpick} from '../../utils';
import {TextureUtils} from '../../textures';
import {Stylesheets} from '../../utils/Stylesheets';
import {IConfigurator} from './IConfigurator';
import {PixelatedConfigurator} from './PixelatedConfigurator';
import {AAQualityConfigurator} from './AAQualityConfigurator';
import {AAPerformanceConfigurator} from './AAPerformanceConfigurator';

const $dispatchResizeEvent = Symbol('dispatchResizeEvent');
const $dispatchFrameEvent = Symbol('dispatchFrameEvent');
const $lockPixelRatio = Symbol('lockPixelRatio');
const $lastPixelRatio = Symbol('lastPixelRatio');
const $rafID = Symbol('rafID');

const RESIZE = 'resize';
const FRAME = 'frame';

export type DisplayGetSizeFn = (display: Display) => { width: number, height: number };
export type DisplayResizeStrategy = HTMLElement | DisplayGetSizeFn | 'fullscreen';

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

}

const filterWebGLRendererParameters = unpick<WebGLRendererParameters>([
  'resizeStrategy',
  'pixelate',
  'clearColor',
  'scene',
  'canvas',
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

export class Display extends EventDispatcher {

  readonly renderer: WebGLRenderer;

  readonly canvas: HTMLCanvasElement;

  readonly texUtils: TextureUtils;

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

  constructor(el: HTMLElement, options?: DisplayOptions & WebGLRendererParameters) {
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

    const configurator = readOption<DisplayOptions>(options, 'configurator', () => {
      return createConfigurator(readOption<DisplayOptions>(options, 'mode') as DisplayMode);
    }) as IConfigurator;

    const pixelRatio = Number(readOption<DisplayOptions>(options, 'pixelRatio', 0));

    this[$lockPixelRatio] = isNaN(pixelRatio) || pixelRatio < 1 ? configurator.getPixelRatio() : pixelRatio;

    this.resizeStrategy = readOption<DisplayOptions>(options, 'resizeStrategy', resizeRefEl) as DisplayResizeStrategy;

    const renderParams = <WebGLRendererParameters>{
      ...configurator.getWebGlRendererParameters(filterWebGLRendererParameters(options)),
      canvas: this.canvas,
    };

    this.renderer = new WebGLRenderer(renderParams);

    const {domElement} = this.renderer;
    Stylesheets.addRule(domElement, 'picimo', `touch-action: none;`);
    domElement.setAttribute('touch-action', 'none'); // => PEP polyfill

    if (resizeRefEl && resizeRefEl.tagName !== 'CANVAS') {
      Stylesheets.addRule(resizeRefEl, 'picimo-container', `
        font-size: 0;
      `);
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

    this.texUtils = new TextureUtils(this.renderer, configurator.getTextureUtilsOptions());

    const clearColor = readOption<DisplayOptions>(options, 'clearColor', new Color()) as Color | string;

    this.renderer.setClearColor(
      clearColor instanceof Color ? clearColor : new Color(clearColor),
      renderParams.alpha ? 0 : 1,
    );

    configurator.postSetup(this);

    this.resize();

    // on-rotate-go-fullscreen (experimental)
    if (this.resizeStrategy === 'fullscreen') {
      const { screen } = window;
      if (typeof screen !== 'undefined' && typeof screen.orientation !== 'undefined') {
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

  get pixelRatio() {
    return this[$lockPixelRatio] || window.devicePixelRatio || 1;
  }

  resize() {
    const { resizeStrategy } = this;

    let wPx: number = 320;
    let hPx: number = 200;

    if (resizeStrategy === 'fullscreen') {
      wPx = window.innerWidth;
      hPx = window.innerHeight;
    } else if (typeof resizeStrategy === 'function') {
      const { width, height } = resizeStrategy(this);
      wPx = Math.floor(width);
      hPx = Math.floor(height);
    } else if (resizeStrategy instanceof HTMLElement) {
      const { width, height } = resizeStrategy.getBoundingClientRect();
      wPx = Math.floor(width);
      hPx = Math.floor(height);
    }

    const { pixelRatio } = this;

    if (pixelRatio !== this[$lastPixelRatio] || wPx !== this.width || hPx !== this.height) {

      this.width = wPx;
      this.height = hPx;
      this[$lastPixelRatio] = pixelRatio;

      this.renderer.setPixelRatio(this.pixelRatio);
      this.renderer.setSize(wPx, hPx);

      if (this.frameNo > 0) {
        this[$dispatchResizeEvent](); // no need to emit this inside construction phase
      }
    }
  }

  private [$dispatchResizeEvent]() {
    this.dispatchEvent({

      type: RESIZE,

      display: this,

      width: this.width,
      height: this.height,

    });
  }

  private [$dispatchFrameEvent]() {
    this.dispatchEvent({

      type: FRAME,

      display: this,

      width: this.width,
      height: this.height,

      now: this.now,
      deltaTime: this.deltaTime,
      frameNo: this.frameNo,

    });
  }

  renderFrame(now = window.performance.now()) {

    this.lastNow = this.now;
    this.now = now / 1000.0;

    if (this.frameNo > 0) {
      this.deltaTime = this.now - this.lastNow;
    }

    this.resize();

    if (this.frameNo === 0) {
      this[$dispatchResizeEvent](); // always call resize before render the first frame!
    }

    this.renderer.clear(); // TODO add autoClear option?

    this[$dispatchFrameEvent]();

    ++this.frameNo;

  }

  start() {
    const renderFrame = (now: number) => {
      if (!this.pause) {
        this.renderFrame(now);
      }
      this[$rafID] = window.requestAnimationFrame(renderFrame);
    }
    this[$rafID] = window.requestAnimationFrame(renderFrame);
    this.pause = false;
  }

  stop() {
    window.cancelAnimationFrame(this[$rafID]);
  }

}

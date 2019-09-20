import * as THREE from 'three';

import { readOption, generateUuid, unpick } from '../../utils';
import { TextureUtils } from '../../textures';

const CSS_CLASS_PICIMO = `picimo-${generateUuid()}`;
const CSS_PICIMO = `
  .${CSS_CLASS_PICIMO} {
    touch-action: none;
  }
`;

const CSS_CLASS_PIXELATE = `pixelate-${generateUuid()}`;
const CSS_PIXELATE = `
  .${CSS_CLASS_PIXELATE} {
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }
`;

function installGlobalScriptNode(id: string, css: string) {
  if (!document.getElementById(id)) {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = css;
    styleEl.setAttribute('id', id);
    document.head.appendChild(styleEl);
  }
}

const $dispatchResizeEvent = Symbol('dispatchResizeEvent');
const $dispatchFrameEvent = Symbol('dispatchFrameEvent');
const $lockPixelRatio = Symbol('lockPixelRatio');
const $lastPixelRatio = Symbol('lastPixelRatio');
const $rafID = Symbol('rafID');

const RESIZE = 'resize';
const FRAME = 'frame';

export type DisplayGetSizeFn = (display: Display) => { width: number, height: number };
export type DisplayResizeStrategy = HTMLElement | DisplayGetSizeFn;

export interface DisplayOptions {

  resizeStrategy?: DisplayResizeStrategy;

  /**
   * Activate pixel art mode.
   * Restrict the *device pixel ratio* to 1.
   * Set the `image-rendering` css style for the `<canvas>` element.
   */
  pixelate?: boolean;

  /**
   * Set a fixed device pixel ratio. Otherwise DPR is read from `window.devicePixelRatio`
   */
  pixelRatio?: number;

  clearColor?: string | THREE.Color;

}

const extractWebGLRendererParameters = unpick<THREE.WebGLRendererParameters>([
  'resizeStrategy',
  'pixelate',
  'clearColor',
  'canvas',
]);

export class Display extends THREE.EventDispatcher {

  readonly renderer: THREE.WebGLRenderer;

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

  constructor(el: HTMLElement, options?: DisplayOptions & THREE.WebGLRendererParameters) {
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

    const pixelate = Boolean(readOption<DisplayOptions>(options, 'pixelate', false));
    let pixelRatio = Number(readOption<DisplayOptions>(options, 'pixelRatio', 0));

    if (pixelate) {
      installGlobalScriptNode(CSS_CLASS_PIXELATE, CSS_PIXELATE);
      this.canvas.classList.add(CSS_CLASS_PIXELATE);
      pixelRatio = 1;
    }

    this[$lockPixelRatio] = pixelRatio;

    this.resizeStrategy = readOption<DisplayOptions>(options, 'resizeStrategy', resizeRefEl) as DisplayResizeStrategy;

    const rendererArgs = Object.assign({
      precision: 'mediump',
    }, extractWebGLRendererParameters(options), {
      canvas: this.canvas,
    });

    this.renderer = new THREE.WebGLRenderer(rendererArgs);

    installGlobalScriptNode(CSS_CLASS_PICIMO, CSS_PICIMO);
    const {domElement} = this.renderer;
    domElement.classList.add(CSS_CLASS_PICIMO);
    domElement.setAttribute('touch-action', 'none'); // => PEP polyfill

    this.texUtils = new TextureUtils(this.renderer, {
      defaultAnisotrophy: pixelate ? 0 : Infinity,
      defaultFilter: pixelate ? THREE.NearestFilter : THREE.LinearFilter,
    });

    const clearColor = readOption(options, 'clearColor', new THREE.Color()) as THREE.Color | string;

    this.renderer.setClearColor(
      clearColor instanceof THREE.Color ? clearColor : new THREE.Color(clearColor),
      options.alpha ? 0 : 1,
    );

    this.resize();

    // on-rotate-go-fullscreen (experimental)
    const { screen } = window;
    if (typeof screen !== 'undefined' && typeof screen.orientation !== 'undefined') {
      screen.orientation.onchange = () => {
        if (screen.orientation.type.indexOf('landscape') !== -1) {
          if (typeof document.body.requestFullscreen === 'function') {
            document.body.requestFullscreen();
          }
        } else if (screen.orientation.type.indexOf('portrait') !== -1) {
          if (typeof document.exitFullscreen === 'function') {
            document.exitFullscreen();
          }
        }
      };
    }
  }

  get pixelRatio() {
    return this[$lockPixelRatio] || window.devicePixelRatio || 1;
  }

  resize() {
    const { resizeStrategy } = this;

    let wPx: number = 320;
    let hPx: number = 200;

    if (resizeStrategy instanceof HTMLElement) {
      const { width, height } = resizeStrategy.getBoundingClientRect();
      wPx = Math.floor(width);
      hPx = Math.floor(height);
    } else if (typeof resizeStrategy === 'function') {
      const { width, height } = resizeStrategy(this);
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

    this.renderer.clear();

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

import * as THREE from 'three';

import { readOption, pick, generateUuid } from '../../utils';
import { TextureUtils } from '../../textures';

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

const getWebGLRendererParameters = pick([
  'alpha',
  'antialias',
  'depth',
  'logarithmicDepthBuffer',
  'powerPreference',
  'precision',
  'premultipliedAlpha',
  'preserveDrawingBuffer',
  'stencil',
]);

const $dispatchResizeEvent = Symbol('dispatchResizeEvent');
const $dispatchFrameEvent = Symbol('dispatchFrameEvent');
const $lockPixelRatio = Symbol('lockPixelRatio');
const $lastPixelRatio = Symbol('lastPixelRatio');
const $rafID = Symbol('rafID');

const RESIZE = 'resize';
const FRAME = 'frame';

export type DisplayResizeStrategy = 'canvas' | 'container';

export interface DisplayOptions extends THREE.WebGLRendererParameters {

  resizeStrategy?: DisplayResizeStrategy;

  /**
   * Restrict the *device pixel ratio* to 1 and activate pixel art mode
   * (set the `image-rendering` css prop for the `<canvas>` element)
   */
  pixelate?: boolean;

  /**
   * Set a fixed device pixel ratio. Otherwise DPR is read from `window.devicePixelRatio`
   */
  pixelRatio?: number;

  clearColor?: string | THREE.Color;

}

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

  constructor(el: HTMLElement, options?: DisplayOptions) {
    super();

    let defaultResizeStrategy = 'canvas';

    if (el && el.tagName === 'CANVAS') {
      this.canvas = el as HTMLCanvasElement;
    } else {
      this.canvas = document.createElement('canvas');
      if (el) {
        el.appendChild(this.canvas);
        defaultResizeStrategy = 'container';
      }
    }

    const pixelate = Boolean(readOption(options, 'pixelate', false));
    let pixelRatio = Number(readOption(options, 'pixelRatio', 0));

    if (pixelate) {
      installGlobalScriptNode(CSS_CLASS_PIXELATE, CSS_PIXELATE);
      this.canvas.classList.add(CSS_CLASS_PIXELATE);
      pixelRatio = 1;
    }

    this[$lockPixelRatio] = pixelRatio;

    this.resizeStrategy = readOption(options, 'resizeStrategy', defaultResizeStrategy) as DisplayResizeStrategy;

    const rendererArgs = Object.assign({
      precision: 'mediump',
    }, getWebGLRendererParameters(options), {
      canvas: this.canvas,
    });

    this.renderer = new THREE.WebGLRenderer(rendererArgs);

    this.texUtils = new TextureUtils({
      maxAnisotrophy: this.renderer.capabilities.getMaxAnisotropy(),
      defaultAnisotrophy: pixelate ? 0 : Infinity,
      defaultFilter: pixelate ? THREE.NearestFilter : THREE.LinearFilter,
    });

    const clearColor = readOption(options, 'clearColor', new THREE.Color()) as THREE.Color | string;

    this.renderer.setClearColor(
      clearColor instanceof THREE.Color ? clearColor : new THREE.Color(clearColor),
      options.alpha ? 0 : 1,
    );

    this.resize();
  }

  get pixelRatio() {
    return this[$lockPixelRatio] || window.devicePixelRatio || 1;
  }

  resize() {
    const { canvas, pixelRatio } = this;

    const {
      clientWidth: wPx,
      clientHeight: hPx,
    } = this.resizeStrategy === 'container' ? canvas.parentNode as HTMLElement : canvas;

    if (pixelRatio !== this[$lastPixelRatio] || wPx !== this.width || hPx !== this.height) {

      this.width = wPx;
      this.height = hPx;
      this[$lastPixelRatio] = pixelRatio;

      this.renderer.setPixelRatio(this.pixelRatio);
      this.renderer.setSize(wPx, hPx);

      if (this.frameNo > 0) {
        this[$dispatchResizeEvent]();
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
      this[$dispatchResizeEvent]();
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

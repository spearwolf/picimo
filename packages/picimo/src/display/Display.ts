import {Eventize} from 'eventize-js';

import {WebGLRendererParameters, WebGLRenderer, Color} from 'three';

import {TextureFactory} from '../textures';
import {readOption, unpick, Stylesheets} from '../utils';

import {IConfigurator} from './IConfigurator';

import {makeConfigurator} from './configurators/makeConfigurator';
import {
  EVENT_INIT,
  EVENT_FRAME,
  EVENT_RESIZE,
  ATTR_DISPLAY_MODE,
  ATTR_RESIZE_STRATEGY,
  ATTR_PIXEL_RATIO,
  ATTR_GO_FULLSCREEN_ON_DEVICE_ROTATE,
} from './constants';
import {
  IDisplayEventParameters,
  IDisplayOnInitParameters,
  IDisplayOnResizeParameters,
  IDisplayOnFrameParamters,
  IStage2D,
  DisplayResizeStrategy,
  DisplayMode,
  DisplayOptions,
} from './types';

const filterWebGLRendererParameters = unpick<WebGLRendererParameters>([
  'autoClear',
  'canvas',
  'clearColor',
  'configurator',
  'goFullscreenOnDeviceRotate',
  'mode',
  'pixelRatio',
  'resizeStrategy',
  'scene',
  'stage',
]);

const readAttribute = (el: HTMLElement, attrName: string): string => {
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
   * _CSS_ pixels
   */
  width = 0;

  /**
   * _CSS_ pixels
   */
  height = 0;

  /**
   * current time in seconds
   */
  now = 0;

  /**
   * the time in seconds from the last animation frame
   */
  lastNow = 0;

  /**
   * the time in seconds that has elapsed since the last animation frame
   */
  deltaTime = 0;

  /**
   * current frame number (starts at 0)
   */
  frameNo = 0;

  pause = false;

  /**
   * defines whether the renderer should automatically clear its output before rendering a frame
   */
  autoClear = true;

  goFullscreenOnDeviceRotate = false;

  #lockPixelRatio = 0;
  #lastPixelRatio = 0;

  #rafID = 0;

  #stage: IStage2D;

  #renderParams: WebGLRendererParameters;

  #clearColor: Color;

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

    const getOption = <T = unknown>(
      propName: keyof DisplayOptions,
      defaultValue?: any,
    ): T => readOption<DisplayOptions>(options, propName, defaultValue) as T;

    const getOptionOrAttribute = <T = unknown>(
      propName: keyof DisplayOptions,
      attrName: string,
      defaultValue?: T,
    ): T =>
      readOption<DisplayOptions>(
        options,
        propName,
        readAttribute(el, attrName) ?? defaultValue,
      ) as T;

    const configurator = getOption<IConfigurator>('configurator', () =>
      makeConfigurator(
        getOptionOrAttribute<DisplayMode>('mode', ATTR_DISPLAY_MODE),
      ),
    );

    const pixelRatio = Number(
      getOption(
        'pixelRatio',
        parseInt(readAttribute(el, ATTR_PIXEL_RATIO) ?? '0', 10),
      ),
    );

    this.autoClear = getOption<boolean>('autoClear', true);

    this.goFullscreenOnDeviceRotate = getOptionOrAttribute<boolean>(
      'goFullscreenOnDeviceRotate',
      ATTR_GO_FULLSCREEN_ON_DEVICE_ROTATE,
      false,
    );

    this.#lockPixelRatio =
      isNaN(pixelRatio) || pixelRatio < 1
        ? configurator.getPixelRatio()
        : pixelRatio;

    this.resizeStrategy = getOptionOrAttribute<DisplayResizeStrategy>(
      'resizeStrategy',
      ATTR_RESIZE_STRATEGY,
      resizeRefEl,
    );

    this.#renderParams = {
      ...configurator.getWebGlRendererParameters(
        filterWebGLRendererParameters(options),
      ),
      canvas: this.canvas,
    };

    this.renderer = new WebGLRenderer(this.#renderParams);

    const {domElement} = this.renderer;
    Stylesheets.addRule(domElement, 'picimo', 'touch-action: none;');
    domElement.setAttribute('touch-action', 'none'); // => PEP polyfill

    if (resizeRefEl && resizeRefEl.tagName !== 'CANVAS') {
      Stylesheets.addRule(resizeRefEl, 'picimo-container', 'font-size: 0;');
    }

    const containerOrCanvasEl = resizeRefEl || domElement;

    this.textureFactory = new TextureFactory(
      this.renderer,
      configurator.getTextureFactoryOptions(),
    );

    this.setClearColor(getOption<Color | string>('clearColor', new Color()));

    configurator.postSetup(this);

    this.stage = readOption<DisplayOptions>(options, 'stage') as IStage2D;

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
            if (this.goFullscreenOnDeviceRotate) {
              if (typeof containerOrCanvasEl.requestFullscreen === 'function') {
                containerOrCanvasEl.requestFullscreen();
              }
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

  setClearColor(clearColor: string | number | Color): void {
    this.#clearColor =
      clearColor instanceof Color ? clearColor : new Color(clearColor);
    this.renderer.setClearColor(
      this.#clearColor,
      this.#renderParams.alpha ? 0 : 1,
    );
  }

  get clearColor(): Color {
    return this.#clearColor;
  }

  get stage(): IStage2D {
    return this.#stage;
  }

  set stage(stage: IStage2D) {
    const curStage = this.#stage;
    if (stage !== curStage) {
      if (curStage) {
        this.off(curStage);
      }
      this.#stage = stage;
      if (stage) {
        this.on(stage);
        stage.resize(this.#getCommonEventParameters());
      }
    }
  }

  get pixelRatio(): number {
    return this.#lockPixelRatio || window.devicePixelRatio || 1;
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
      pixelRatio !== this.#lastPixelRatio ||
      wPx !== this.width ||
      hPx !== this.height
    ) {
      this.width = wPx;
      this.height = hPx;
      this.#lastPixelRatio = pixelRatio;

      this.renderer.setPixelRatio(this.pixelRatio);
      this.renderer.setSize(wPx, hPx);

      if (this.frameNo > 0) {
        this.#emitResize(); // no need to emit this inside construction phase
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
      this.#emitResize(); // always emit resize event before render the first frame!
    }

    if (this.autoClear) {
      this.renderer.clear();
    }

    this.#emitFrame();

    ++this.frameNo;
  }

  start(): void {
    this.pause = false;
    this.#emitInit();

    const renderFrame = (now: number) => {
      if (!this.pause) {
        this.renderFrame(now);
      }
      this.#rafID = window.requestAnimationFrame(renderFrame);
    };

    this.#rafID = window.requestAnimationFrame(renderFrame);
  }

  stop(): void {
    window.cancelAnimationFrame(this.#rafID);
  }

  #emitInit = (): void =>
    this.emit(EVENT_INIT, {
      ...this.#getCommonEventParameters(),
    } as IDisplayOnInitParameters);

  #emitResize = (): void =>
    this.emit(
      EVENT_RESIZE,
      this.#getCommonEventParameters() as IDisplayOnResizeParameters,
    );

  #emitFrame = (): void =>
    this.emit(EVENT_FRAME, {
      ...this.#getCommonEventParameters(),
      now: this.now,
      deltaTime: this.deltaTime,
      frameNo: this.frameNo,
    } as IDisplayOnFrameParamters);

  #getCommonEventParameters = (): IDisplayEventParameters => ({
    display: this,
    stage: this.stage,
    width: this.width,
    height: this.height,
  });
}

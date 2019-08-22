import {Map2DView} from "../map2d";
import {IProjection} from "../cameras";
import {InputControl} from "./InputControl";

interface PanState {

  pointerType: string,

  panX: number;
  panY: number;

  lastX: number;
  lastY: number;

}

const $pointersDown = Symbol('pointersDown');

const mergePan = (states: PanState[]) => states.reduce(({panX, panY}, state) => {
  panX += state.panX;
  panY += state.panY;

  state.panX = 0;
  state.panY = 0;

  return { panX, panY };
}, {
  panX: 0,
  panY: 0,
});

const MOUSE = 'mouse';

export class Map2DPanControl extends InputControl {

  map2dView: Map2DView;

  projection: IProjection;

  pixelsPerSecond = 0;

  speedNorth = 0;
  speedEast = 0;
  speedSouth = 0;
  speedWest = 0;

  private [$pointersDown]: Map<number, PanState> = new Map();

  cursorStyle: string;

  /**
   * @param speed pixels per seconds
   */
  constructor(map2dView: Map2DView, projection: IProjection, speed: number = 100, cursorStyle = '') {
    super();

    this.map2dView = map2dView;
    this.projection = projection;
    this.pixelsPerSecond = speed;
    this.cursorStyle = cursorStyle;

    this.start();
  }

  /**
   * @param t delta time since last `update()` call in seconds
   */
  update(t: number) {
    const { map2dView: view, projection } = this;

    view.centerY -= this.speedNorth * t;
    view.centerY += this.speedSouth * t;

    view.centerX += this.speedEast * t;
    view.centerX -= this.speedWest * t;

    const { panX, panY } = mergePan(Array.from(this[$pointersDown].values()));
    const { pixelRatioH, pixelRatioV } = projection;

    view.centerX -= panX / pixelRatioH;
    view.centerY -= panY / pixelRatioV;

    projection.origin.set(view.centerX, view.centerY);

    view.width = projection.width;
    view.height = projection.height;
  }

  start() {
    const {subscribe} = this;

    subscribe(document, 'keydown', this.onKeyDown);
    subscribe(document, 'keyup', this.onKeyUp);
    subscribe(document, 'pointerdown', this.onPointerDown);
    subscribe(document, 'pointerup', this.onPointerUp);
    subscribe(document, 'pointermove', this.onPointerMove);
  }

  private isPanPointer(event: PointerEvent) {
    if (event.isPrimary) {
      if (event.type !== 'pointerup' && event.pointerType === MOUSE) {
        return event.buttons & 1;
      }
      return true;
    }
    return false;
  }

  onPointerDown = (event: PointerEvent) => {
    if (this.isPanPointer(event)) {
      const pointersDown = this[$pointersDown];
      if (!pointersDown.has(event.pointerId)) {
        const {x:lastX, y:lastY} = this.toRelativeCoords(event);
        pointersDown.set(event.pointerId, {

          pointerType: event.pointerType,

          lastX,
          lastY,

          panX: 0,
          panY: 0,

        });
      }
      if (event.pointerType === 'mouse') {
        this.hideCursor(event);
      }
    }
  }

  private hideCursor(event: PointerEvent) {
    const el = (event.target as HTMLElement);
    el.style.cursor = 'none';
  }

  onPointerUp = (event: PointerEvent) => {
    const pointersDown = this[$pointersDown];
    if (this.isPanPointer(event)) {
      const state = pointersDown.get(event.pointerId);
      if (state) {
        this.updatePanState(event, state);
        pointersDown.delete(event.pointerId);
      }
    }
    if (event.pointerType === 'mouse') {
      if (!Array.from(pointersDown.values()).find(state => state.pointerType === MOUSE)) {
        this.restoreCursorStyle(event);
      }
    }
  }

  private restoreCursorStyle(event: PointerEvent) {
    const el = (event.target as HTMLElement);
    const {cursorStyle} = this;
    if (el.style.cursor !== cursorStyle) {
      el.style.cursor = cursorStyle;
    }
  }

  onPointerMove = (event: PointerEvent) => {
    if (this.isPanPointer(event)) {
      const state = this[$pointersDown].get(event.pointerId);
      if (state) {
        this.updatePanState(event, state);
      }
    }
    if (event.pointerType === MOUSE && event.buttons === 0) {
      this.restoreCursorStyle(event);
    }
  }

  private updatePanState(event: PointerEvent, state: PanState) {
    const {x, y} = this.toRelativeCoords(event);

    state.panX += x - state.lastX;
    state.panY += y - state.lastY;

    state.lastX = x;
    state.lastY = y;
  }

  private toRelativeCoords(event: PointerEvent) {
    const { clientX, clientY } = event;
    const { left, top } = (event.target as HTMLElement).getBoundingClientRect();

    return {
      x: clientX - left,
      y: clientY - top,
    };
  }

  onKeyDown = ({keyCode}: KeyboardEvent) => {
    const { pixelsPerSecond } = this;

    switch (keyCode) {
    case 87: // W
      this.speedNorth = pixelsPerSecond;
      break;
    case 83: // S
      this.speedSouth = pixelsPerSecond;
      break;
    case 65: // A
      this.speedWest = pixelsPerSecond;
      break;
    case 68: // D
      this.speedEast = pixelsPerSecond;
      break;
    }
  }

  onKeyUp = ({keyCode}: KeyboardEvent) => {
    switch (keyCode) {
    case 87: // W
      this.speedNorth = 0;
      break;
    case 83: // S
      this.speedSouth = 0;
      break;
    case 65: // A
      this.speedWest = 0;
      break;
    case 68: // D
      this.speedEast = 0;
      break;
    }
  }

}

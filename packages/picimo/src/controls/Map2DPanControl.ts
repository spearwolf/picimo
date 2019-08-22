import {Map2DView} from "../map2d";
import {IProjection} from "../cameras";
import {InputControl} from "./InputControl";

interface PanState {

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

export class Map2DPanControl extends InputControl {

  map2dView: Map2DView;

  projection: IProjection;

  pixelsPerSecond = 0;

  speedNorth = 0;
  speedEast = 0;
  speedSouth = 0;
  speedWest = 0;

  private [$pointersDown]: Map<number, PanState> = new Map();

  /**
   * @param speed pixels per seconds
   */
  constructor(map2dView: Map2DView, projection: IProjection, speed: number = 100) {
    super();

    this.map2dView = map2dView;
    this.projection = projection;
    this.pixelsPerSecond = speed;

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
    const { pixelRatio } = projection;

    view.centerX -= panX / pixelRatio;
    view.centerY -= panY / pixelRatio;

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

  onPointerDown = (event: PointerEvent) => {
    const pointersDown = this[$pointersDown];
    if (!pointersDown.has(event.pointerId)) {
      pointersDown.set(event.pointerId, {

        panX: 0,
        panY: 0,

        lastX: event.clientX,
        lastY: event.clientY,

      });
    }
  }

  onPointerUp = (event: PointerEvent) => {
    const pointersDown = this[$pointersDown];
    const state = pointersDown.get(event.pointerId);
    if (state) {
      this.updatePanState(event, state);
    }
    pointersDown.delete(event.pointerId);
  }

  onPointerMove = (event: PointerEvent) => {
    const state = this[$pointersDown].get(event.pointerId);
    if (state) {
      this.updatePanState(event, state);
    }
  }

  private updatePanState(event: PointerEvent, state: PanState) {

    const { clientX, clientY } = event;
    const { left, top } = (event.target as HTMLElement).getBoundingClientRect();

    const localX = clientX - left;
    const localY = clientY - top;

    state.panX += localX - state.lastX;
    state.panY += localY - state.lastY;

    state.lastX = localX;
    state.lastY = localY;

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

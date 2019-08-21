import { Map2DView } from "../map2d";
import { IProjection } from "../cameras";
import { InputControl } from "./InputControl";

interface PointerPanInfo {

  panX: number;
  panY: number;

  lastX: number;
  lastY: number;

}

export class Map2DPanControl extends InputControl {

  map2dView: Map2DView;

  projection: IProjection;

  pixelsPerSecond = 0;

  speedNorth = 0;
  speedEast = 0;
  speedSouth = 0;
  speedWest = 0;

  private pointersDown: Map<number, PointerPanInfo> = new Map();

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
   * @param t delta time in seconds
   */
  update(t: number) {
    const { map2dView: view, projection } = this;

    view.centerY -= this.speedNorth * t;
    view.centerY += this.speedSouth * t;
    view.centerX += this.speedEast * t;
    view.centerX -= this.speedWest * t;

    const { panX, panY } = this.mergePan();
    const { pixelRatio } = projection;

    view.centerX -= panX / pixelRatio;
    view.centerY -= panY / pixelRatio;

    projection.origin.set(view.centerX, view.centerY);

    view.width = projection.width;
    view.height = projection.height;
  }

  private mergePan() {
    return Array.from(this.pointersDown.values()).reduce(({panX, panY}, info) => {
      panX += info.panX;
      panY += info.panY;
      info.panX = 0;
      info.panY = 0;
      return { panX, panY };
    }, { panX: 0, panY: 0 });
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
    if (!this.pointersDown.has(event.pointerId)) {
      this.pointersDown.set(event.pointerId, {
        panX: 0,
        panY: 0,
        lastX: event.clientX,
        lastY: event.clientY,
      });
    }
  }

  onPointerUp = (event: PointerEvent) => {
    const info = this.pointersDown.get(event.pointerId);
    if (info) {
      this.updatePanInfo(event, info);
    }
    this.pointersDown.delete(event.pointerId);
  }

  onPointerMove = (event: PointerEvent) => {
    const info = this.pointersDown.get(event.pointerId);
    if (info) {
      this.updatePanInfo(event, info);
    }
  }

  private updatePanInfo(event: PointerEvent, info: PointerPanInfo) {
    const { clientX, clientY } = event;
    const { left, top } = (event.target as HTMLElement).getBoundingClientRect();
    const localX = clientX - left;
    const localY = clientY - top;
    info.panX += localX - info.lastX;
    info.panY += localY - info.lastY;
    info.lastX = localX;
    info.lastY = localY;
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

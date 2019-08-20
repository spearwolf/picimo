import { Map2DView } from "../map2d";
import { IProjection } from "../cameras";

const $unregister = Symbol('unregister');
const $subscribe = Symbol('subscribe');

export class Map2DPanControl {

  map2dView: Map2DView;

  projection: IProjection;

  pixelsPerSecond = 0;

  speedNorth = 0;
  speedEast = 0;
  speedSouth = 0;
  speedWest = 0;

  private readonly [$unregister]: ([EventTarget, string, any])[] = [];
 
  /**
   * @param speed pixels per seconds
   */
  constructor(map2dView: Map2DView, projection: IProjection, speed: number = 100) {

    this.map2dView = map2dView;
    this.projection = projection;
    this.pixelsPerSecond = speed;

    this.registerListeners();

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

    projection.origin.set(view.centerX, view.centerY);

    view.width = projection.width;
    view.height = projection.height;
  }

  registerListeners() {

    const subscribe = this[$subscribe];

    subscribe(document, 'keydown', this.onKeyDown);
    subscribe(document, 'keyup', this.onKeyUp);

  }

  private [$subscribe] = (host: EventTarget, eventName: string, callback: any) => {
    host.addEventListener(eventName, callback, { passive: true });
    this[$unregister].push([host, eventName, callback]);
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

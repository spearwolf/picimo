import { Map2DView } from "../map2d";
import { IProjection } from "../cameras";
import { InputControl } from "./InputControl";

export class Map2DPanControl extends InputControl {

  map2dView: Map2DView;

  projection: IProjection;

  pixelsPerSecond = 0;

  speedNorth = 0;
  speedEast = 0;
  speedSouth = 0;
  speedWest = 0;

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

    projection.origin.set(view.centerX, view.centerY);

    view.width = projection.width;
    view.height = projection.height;
  }

  start() {

    const {subscribe} = this;

    subscribe(document, 'keydown', this.onKeyDown);
    subscribe(document, 'keyup', this.onKeyUp);

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

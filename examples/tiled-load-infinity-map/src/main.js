import { Display, Stage2D, OrthographicProjection, Plane } from "picimo";

const display = new Display(document.querySelector("[picimo]"), {
  mode: "pixelated",
  resizeStrategy: "fullscreen",
  stage: new Stage2D(
    new OrthographicProjection(Plane.XZ, { pixelZoom: 2 })
  ),
});

display.start();

const DEG2RAD = Math.PI / 180.0;

type CircleCoords = [number, number, number];
type CircleCoordsFn = (x: number, y: number, z: number) => void;

/**
 * @public
 */
export function makeCircleCoords(
  steps: number,
  radius = 1,
  circleCoordsFn?: CircleCoordsFn,
) {
  const halfRadius = 0.5 * radius;
  const delta = 360.0 / steps;
  const arr: CircleCoords[] = [];

  for (let i = 0, deg = 0; i < steps; i++) {
    const rad = deg * DEG2RAD;

    const x = halfRadius * Math.sin(rad);
    const y = halfRadius * Math.cos(rad);

    const z = i / steps;

    arr.push([x, y, z]);

    if (circleCoordsFn != null) {
      circleCoordsFn(x, y, z);
    }

    deg += delta;
  }

  return arr;
}

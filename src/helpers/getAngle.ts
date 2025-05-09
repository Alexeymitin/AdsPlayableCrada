import { Point } from 'pixi.js';

export function getAngle(to: Point, from: Point, n = Math.PI / 2) {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

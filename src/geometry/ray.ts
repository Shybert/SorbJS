import { Point, Vector } from './geometry'

export class Ray {
  origin: Point
  direction: Vector
  constructor(origin?: Point, direction?: Vector) {
    if (origin) this.origin = origin
    else this.origin = new Point(0, 0, 0)
    if (direction) this.direction = direction
    else this.direction = new Vector(0, 0, 0)
  }

  position(t: number): Point {
    return this.origin.add(this.direction.multiply(t))
  }
}

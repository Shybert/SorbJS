import { Point, Vector } from '~src/geometry/geometry'

export function vectorBetween(point1: Point, point2: Point): Vector {
  return new Vector(
    point1.x - point2.x,
    point1.y - point2.y,
    point1.z - point2.z
  )
}

export function dot(vector1: Vector, vector2: Vector): number {
  return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z
}

export function cross(vector1: Vector, vector2: Vector): Vector {
  return new Vector(
    vector1.y * vector2.z - vector1.z * vector2.y,
    vector1.z * vector2.x - vector1.x * vector2.z,
    vector1.x * vector2.y - vector1.y * vector2.x
  )
}

export function discriminant(a: number, b: number, c: number): number {
  return b ** 2 - 4 * a * c
}

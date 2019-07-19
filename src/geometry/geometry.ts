import { floatingPointEquals } from '../utils'

export class Point {
  x: number
  y: number
  z: number
  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  equals(point: Point) {
    return (
      floatingPointEquals(this.x, point.x) &&
      floatingPointEquals(this.y, point.y) &&
      floatingPointEquals(this.z, point.z)
    )
  }

  add(vector: Vector) {
    this.x += vector.x
    this.y += vector.y
    this.z += vector.z
  }
  subtract(vector: Vector) {
    this.x -= vector.x
    this.y -= vector.y
    this.z -= vector.z
  }
}

export class Vector {
  x: number
  y: number
  z: number
  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  equals(vector: Vector) {
    return (
      floatingPointEquals(this.x, vector.x) &&
      floatingPointEquals(this.y, vector.y) &&
      floatingPointEquals(this.z, vector.z)
    )
  }

  add(vector: Vector) {
    this.x += vector.x
    this.y += vector.y
    this.z += vector.z
  }
  subtract(vector: Vector) {
    this.x -= vector.x
    this.y -= vector.y
    this.z -= vector.z
  }
}

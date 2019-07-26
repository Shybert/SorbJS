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

  toText(): string {
    return `[${this.x}, ${this.y}, ${this.z}]`
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
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
  multiplyScalar(scalar: number) {
    this.x *= scalar
    this.y *= scalar
    this.z *= scalar
  }
  divide(scalar: number) {
    this.x /= scalar
    this.y /= scalar
    this.z /= scalar
  }

  negate() {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
  }

  normalize() {
    this.divide(this.length())
  }
}

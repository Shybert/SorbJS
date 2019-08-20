import { Point, Vector, Matrix } from '~src/geometry/geometry'

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

export function matrixMultiplication(a: Matrix, b: Matrix): Matrix {
  const newMatrix = new Matrix()
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      newMatrix.matrix[i][j] =
        b.matrix[0][j] * a.matrix[i][0] +
        b.matrix[1][j] * a.matrix[i][1] +
        b.matrix[2][j] * a.matrix[i][2] +
        b.matrix[3][j] * a.matrix[i][3]
    }
  }
  return newMatrix
}

import { almostEquals, swapArrayElements } from '~src/utils'

export class Point {
  x: number
  y: number
  z: number
  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  toText(): string {
    return `(${this.x}, ${this.y}, ${this.z})`
  }

  equals(point: Point) {
    return (
      almostEquals(this.x, point.x) &&
      almostEquals(this.y, point.y) &&
      almostEquals(this.z, point.z)
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
      almostEquals(this.x, vector.x) &&
      almostEquals(this.y, vector.y) &&
      almostEquals(this.z, vector.z)
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
  multiply(scalar: number) {
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

export class Matrix {
  matrix: number[][] = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

  // matrix parameter must be a 4x4 array
  constructor(matrix?: number[][]) {
    if (matrix) this.matrix = matrix
  }

  toText() {
    let test: string = '['
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        test += this.matrix[i][j]
        if (j != 3) test += ', '
      }
      if (i != 3) test += '\n'
    }
    return (test += ']')
  }

  equals(matrix: Matrix) {
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        if (!almostEquals(this.matrix[i][j], matrix.matrix[i][j])) return false
      }
    }
    return true
  }

  transpose(): Matrix {
    return new Matrix([
      [
        this.matrix[0][0],
        this.matrix[1][0],
        this.matrix[2][0],
        this.matrix[3][0]
      ],
      [
        this.matrix[0][1],
        this.matrix[1][1],
        this.matrix[2][1],
        this.matrix[3][1]
      ],
      [
        this.matrix[0][2],
        this.matrix[1][2],
        this.matrix[2][2],
        this.matrix[3][2]
      ],
      [
        this.matrix[0][3],
        this.matrix[1][3],
        this.matrix[2][3],
        this.matrix[3][3]
      ]
    ])
  }

  inverse(): Matrix {
    const matrixCopy = new Matrix(this.matrix.map(arr => arr.slice()))
    const identityMatrix = new Matrix()

    for (let i = 0; i < 4; i += 1) {
      let pivot = matrixCopy.matrix[i][i]

      // If the pivot is 0, swap with a lower row
      if (pivot === 0) {
        for (let j = i + 1; j < 4; j += 1) {
          if (matrixCopy.matrix[j][i] !== 0) {
            swapArrayElements(matrixCopy.matrix, i, j)
            swapArrayElements(identityMatrix.matrix, i, j)
            break
          }
        }

        pivot = matrixCopy.matrix[i][i]
        if (pivot === 0)
          throw new Error('Matrix is singular and not invertable.')
      }

      // If the pivot doesn't equal 1, divide the row by the pivot
      if (pivot !== 1) {
        for (let j = 0; j < 4; j += 1) {
          matrixCopy.matrix[i][j] /= pivot
          identityMatrix.matrix[i][j] /= pivot
        }
      }

      // Make all elements in the column, except for the pivot, 0
      for (let j = 0; j < 4; j += 1) {
        if (j !== i && matrixCopy.matrix[j][i] !== 0) {
          const scalar = matrixCopy.matrix[j][i]
          for (let k = 0; k < 4; k += 1) {
            matrixCopy.matrix[j][k] -= scalar * matrixCopy.matrix[i][k]
            identityMatrix.matrix[j][k] -= scalar * identityMatrix.matrix[i][k]
          }
        }
      }
    }

    return identityMatrix
  }
}

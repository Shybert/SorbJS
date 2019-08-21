import {
  vectorBetween,
  dot,
  cross,
  matrixMultiplication,
  matrixVectorMultiplication,
  matrixPointMultiplication
} from '~src/geometry/math'
import { Point, Vector, Matrix } from '~src/geometry/geometry'

describe('vectorBetween', () => {
  test('Should give you the vector between two points', () => {
    const vector = vectorBetween(new Point(9, -3, 4), new Point(-22, 4, -2))
    expect(vector).toEqualVector(new Vector(31, -7, 6))
  })
})

test('dot', () => {
  expect(dot(new Vector(1, 2, 3), new Vector(2, 3, 4))).toBe(20)
})

test('cross', () => {
  const vector1 = new Vector(1, 2, 3)
  const vector2 = new Vector(2, 3, 4)
  expect(cross(vector1, vector2)).toEqualVector(new Vector(-1, 2, -1))
  expect(cross(vector2, vector1)).toEqualVector(new Vector(1, -2, 1))
})

test('matrixMultiplication', () => {
  const a = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]])
  const b = new Matrix([
    [-2, 1, 2, 3],
    [3, 2, 1, -1],
    [4, 3, 6, 5],
    [1, 2, 7, 8]
  ])

  expect(matrixMultiplication(a, b)).toEqualMatrix(
    new Matrix([
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42]
    ])
  )
})

describe('matrixVectorMultiplication', () => {
  test('Should let you multiply a vector by a matrix', () => {
    const matrix = new Matrix([
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 1],
      [0, 0, 0, 1]
    ])
    const vector = new Vector(1, 2, 3)
    expect(matrixVectorMultiplication(matrix, vector)).toEqualVector(
      new Vector(14, 22, 32)
    )
  })
  test("Should ignore the matrix's 4th basis vector", () => {
    const matrix = new Matrix([
      [1, 2, 3, 369],
      [2, 4, 4, 42],
      [8, 6, 4, 0.5678],
      [0, 0, 0, -42]
    ])
    const vector = new Vector(1, 2, 3)
    expect(matrixVectorMultiplication(matrix, vector)).toEqualVector(
      new Vector(14, 22, 32)
    )
  })
})

describe('matrixPointMultiplication', () => {
  test('Should let you multiply a point by a matrix', () => {
    const matrix = new Matrix([
      [1, 2, 3, 0],
      [2, 4, 4, 0],
      [8, 6, 4, 0],
      [0, 0, 0, 1]
    ])
    const point = new Point(1, 2, 3)
    expect(matrixPointMultiplication(matrix, point)).toEqualPoint(
      new Point(14, 22, 32)
    )
  })

  test('Should divide the point by the homogeneous weight', () => {
    const matrix = new Matrix([
      [1, 2, 3, 0],
      [2, 4, 4, 0],
      [8, 6, 4, 0],
      [0, 0, 0, 2]
    ])
    const point = new Point(1, 2, 3)
    expect(matrixPointMultiplication(matrix, point)).toEqualPoint(
      new Point(7, 11, 16)
    )
  })

  test("Should take the matrix's 4th basis vector into account", () => {
    const matrix = new Matrix([
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 2],
      [0, 0, 0, 1]
    ])
    const point = new Point(1, 2, 3)
    expect(matrixPointMultiplication(matrix, point)).toEqualPoint(
      new Point(18, 24, 34)
    )
  })
})

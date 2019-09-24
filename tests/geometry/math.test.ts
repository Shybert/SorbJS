import { vectorBetween, dot, cross, discriminant } from '~src/geometry/math'
import { Point, Vector } from '~src/geometry/geometry'

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

test('discriminant', () => {
  expect(discriminant(2, 4, 9)).toBe(-56)
  expect(discriminant(2, -5, 0)).toBe(25)
  expect(discriminant(2, 4, 2)).toBe(0)
  expect(discriminant(10, 25000, 0.015)).toBeCloseTo(624999999.4)
  expect(discriminant(0.05, 350.67, -89.2)).toBeCloseTo(122987.289)
})

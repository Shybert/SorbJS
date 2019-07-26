import { vectorBetween, dot, cross } from '~geometry/math'
import { Point, Vector } from '~geometry/geometry'

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

import { vectorBetween } from '../../src/geometry/math'
import { Point, Vector } from '../../src/geometry/geometry'

describe('vectorBetween', () => {
  test('Should give you the vector between two points', () => {
    const vector = vectorBetween(new Point(9, -3, 4), new Point(-22, 4, -2))
    expect(vector.equals(new Vector(31, -7, 6))).toBeTruthy()
  })
})

import { Ray } from '~src/geometry/ray'
import { Point, Vector } from '~src/geometry/geometry'

describe('Initialization', () => {
  test('Should initialize to a point at the origin and the zero vector by default', () => {
    const ray = new Ray()
    expect(ray.origin).toEqualPoint(new Point(0, 0, 0))
    expect(ray.direction).toEqualVector(new Vector(0, 0, 0))
  })

  test('Should let you provide a point and a vector to initialize the ray with', () => {
    const origin = new Point(1, 2, 3)
    const direction = new Vector(2, 3, 4)
    const ray = new Ray(origin, direction)
    expect(ray.origin).toEqualPoint(origin)
    expect(ray.direction).toEqualVector(direction)
  })
})

test('position', () => {
  const ray = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0))
  expect(ray.position(0)).toEqualPoint(new Point(2, 3, 4))
  expect(ray.position(1)).toEqualPoint(new Point(3, 3, 4))
  expect(ray.position(-1)).toEqualPoint(new Point(1, 3, 4))
  expect(ray.position(2.5)).toEqualPoint(new Point(4.5, 3, 4))
})

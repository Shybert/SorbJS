import { Sphere } from '~src/geometry/shapes'
import { Ray } from '~src/geometry/ray'
import { Point, Vector } from '~src/geometry/geometry'

describe('intersect', () => {
  test('Intersecting at two points', () => {
    const sphere = new Sphere()
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const intersections = sphere.intersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBeCloseTo(4)
    expect(intersections[1]).toBeCloseTo(6)
  })

  test('Intersecting at a tangent', () => {
    const sphere = new Sphere()
    const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
    const intersections = sphere.intersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBeCloseTo(5)
    expect(intersections[1]).toBeCloseTo(5)
  })

  test('Not intersecting at all', () => {
    const sphere = new Sphere()
    const ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1))
    const intersections = sphere.intersect(ray)
    expect(intersections.length).toBe(0)
  })

  test('Intersecting both behind and in front of the origin', () => {
    const sphere = new Sphere()
    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const intersections = sphere.intersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBeCloseTo(-1)
    expect(intersections[1]).toBeCloseTo(1)
  })

  test('Both intersections behind the origin', () => {
    const sphere = new Sphere()
    const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
    const intersections = sphere.intersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBeCloseTo(-6)
    expect(intersections[1]).toBeCloseTo(-4)
  })
})

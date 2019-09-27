import { Sphere } from '~src/geometry/shapes'
import { Ray } from '~src/geometry/ray'
import { Point, Vector } from '~src/geometry/geometry'

describe('Sphere', () => {
  describe('intersect', () => {
    test('Intersecting at two points', () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      expect(intersections.length).toBe(2)
      expect(intersections[0].t).toBeCloseTo(4)
      expect(intersections[1].t).toBeCloseTo(6)
    })

    test('Intersecting at a tangent', () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      expect(intersections.length).toBe(2)
      expect(intersections[0].t).toBeCloseTo(5)
      expect(intersections[1].t).toBeCloseTo(5)
    })

    test('No intersections', () => {
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
      expect(intersections[0].t).toBeCloseTo(-1)
      expect(intersections[1].t).toBeCloseTo(1)
    })

    test('Both intersections behind the origin', () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      expect(intersections.length).toBe(2)
      expect(intersections[0].t).toBeCloseTo(-6)
      expect(intersections[1].t).toBeCloseTo(-4)
    })

    test('Returns the intersected object', () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      expect(intersections.length).toBe(2)
      expect(intersections[0].object).toBe(sphere)
      expect(intersections[1].object).toBe(sphere)
    })
  })
})

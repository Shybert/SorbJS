import { Sphere, hit } from '~src/geometry/shapes'
import { Ray } from '~src/geometry/ray'
import { Point, Vector } from '~src/geometry/geometry'
import { swapArrayElements } from '~src/utils'
import { Transform } from '~src/geometry/transform'

describe('hit', () => {
  describe('Should always return the closest non-negative intersection', () => {
    test('All intersections have a positive t value', () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      expect(hit(intersections)).toBe(intersections[0])
    })

    test('Some intersections have a negative t value', () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      expect(hit(intersections)).toBe(intersections[1])
    })

    test('All intersections have a negative t value', () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      expect(hit(intersections)).toBeUndefined()
    })

    test("The intersection order doesn't matter", () => {
      const sphere = new Sphere()
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
      const intersections = sphere.intersect(ray)
      swapArrayElements(intersections, 0, 1)
      expect(hit(intersections)).toBe(intersections[1])
    })
  })
})

describe('Sphere', () => {
  describe('transform', () => {
    test('Has a transform', () => {
      const sphere = new Sphere()
      expect(sphere.transform).toBeInstanceOf(Transform)
    })

    test('Initializes to the default transform', () => {
      const sphere = new Sphere()
      expect(sphere.transform).toEqualTransform(new Transform())
    })
  })

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

    test('Intersecting a translated sphere', () => {
      const sphere = new Sphere()
      sphere.transform.translate(5, 0, 0)
      const ray = new Ray(new Point(5, 0, -5), new Vector(0, 0, 1))

      const intersections = sphere.intersect(ray)
      expect(intersections.length).toBe(2)
      expect(intersections[0].t).toBe(4)
      expect(intersections[1].t).toBe(6)
    })

    test('Intersecting a scaled sphere', () => {
      const sphere = new Sphere()
      sphere.transform.scale(2, 2, 2)
      const ray = new Ray(new Point(0, 0, -1), new Vector(0, 0, 1))

      const intersections = sphere.intersect(ray)
      expect(intersections.length).toBe(2)
      expect(intersections[0].t).toBe(-1)
      expect(intersections[1].t).toBe(3)
    })
  })
})

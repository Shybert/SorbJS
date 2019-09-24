import { vectorBetween, dot, cross, quadratic } from '~src/geometry/math'
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

describe('quadratic', () => {
  test('Two real roots', () => {
    const roots = quadratic(2, -5, 0)
    expect(roots.length).toBe(2)
    expect(roots[0]).toBeCloseTo(0)
    expect(roots[1]).toBeCloseTo(2.5)
  })

  test('One real root', () => {
    const roots = quadratic(2, 4, 2)
    expect(roots.length).toBe(2)
    expect(roots[0]).toBeCloseTo(-1)
    expect(roots[1]).toBeCloseTo(-1)
  })

  test('Zero real roots', () => {
    const roots = quadratic(2, 4, 9)
    expect(roots.length).toBe(0)
  })

  test('Large floating point numbers', () => {
    const roots = quadratic(-299.45, 392348.998, 889.000987)
    expect(roots.length).toBe(2)
    expect(roots[0]).toBeCloseTo(-0.0023)
    expect(roots[1]).toBeCloseTo(1310.2344)
  })
})

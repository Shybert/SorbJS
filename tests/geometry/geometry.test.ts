import { Point, Vector } from '../../src/geometry/geometry'

describe('Point', () => {
  describe('equals', () => {
    test('Should return true for equal points', () => {
      expect(new Point(1, 5, -23).equals(new Point(1, 5, -23))).toBeTruthy()
      expect(
        new Point(-23.5, 0.003, 5.33).equals(new Point(-23.5, 0.003, 5.33))
      ).toBeTruthy()
      expect(
        new Point(1e7, 0.00000003, -0).equals(new Point(1e7, 0.00000003, -0))
      ).toBeTruthy()
    })

    test('Should return false for unequal points', () => {
      expect(
        new Point(1, 5.33, -23).equals(new Point(1e10, 5.00005, 99.887))
      ).toBeFalsy()
    })
  })

  test('add', () => {
    const point = new Point(-0.25, 33, 40)
    point.add(new Vector(-0.75, -44, 2))
    expect(point.equals(new Point(-1, -11, 42))).toBeTruthy()
  })

  test('subtract', () => {
    const point = new Point(-0.25, 33, 40)
    point.subtract(new Vector(-0.75, -44, 2))
    expect(point.equals(new Point(0.5, 77, 38))).toBeTruthy()
  })
})

describe('Vector', () => {
  test('length', () => {
    expect(new Vector(1, 0, 0).length()).toBe(1)
    expect(new Vector(0, 1, 0).length()).toBe(1)
    expect(new Vector(0, 0, 1).length()).toBe(1)
    expect(new Vector(1, 2, 3).length()).toBeCloseTo(Math.sqrt(14))
    expect(new Vector(-1, -2, -3).length()).toBeCloseTo(Math.sqrt(14))
  })

  describe('equals', () => {
    test('Should return true for equal vectors', () => {
      expect(new Vector(1, 5, -23).equals(new Vector(1, 5, -23))).toBeTruthy()
      expect(
        new Vector(-23.5, 0.003, 5.33).equals(new Vector(-23.5, 0.003, 5.33))
      ).toBeTruthy()
      expect(
        new Vector(1e7, 0.00000003, -0).equals(new Vector(1e7, 0.00000003, -0))
      ).toBeTruthy()
    })

    test('Should return false for unequal vectors', () => {
      expect(
        new Vector(1, 5.33, -23).equals(new Vector(1e10, 5.00005, 99.887))
      ).toBeFalsy()
    })
  })

  test('add', () => {
    const vector = new Vector(-0.25, 33, 40)
    vector.add(new Vector(-0.75, -44, 2))
    expect(vector.equals(new Vector(-1, -11, 42))).toBeTruthy()
  })

  test('subtract', () => {
    const vector = new Vector(-0.25, 33, 40)
    vector.subtract(new Vector(-0.75, -44, 2))
    expect(vector.equals(new Vector(0.5, 77, 38))).toBeTruthy()
  })

  describe('multiplyScalar', () => {
    test('By a scalar', () => {
      const vector = new Vector(1, -2, 3)
      vector.multiplyScalar(3.5)
      expect(vector.equals(new Vector(3.5, -7, 10.5))).toBeTruthy()
    })

    test('By a fraction', () => {
      const vector = new Vector(1, -2, 3)
      vector.multiplyScalar(0.5)
      expect(vector.equals(new Vector(0.5, -1, 1.5))).toBeTruthy()
    })
  })

  test('divide', () => {
    const vector = new Vector(1, -2, 3)
    vector.divide(2)
    expect(vector.equals(new Vector(0.5, -1, 1.5))).toBeTruthy()
  })

  test('negate', () => {
    const vector = new Vector(-0.25, 33, 40)
    vector.negate()
    expect(vector.equals(new Vector(0.25, -33, -40))).toBeTruthy()
  })
})

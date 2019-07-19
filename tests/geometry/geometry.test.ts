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

  describe('add', () => {
    test('Should be the same as adding the corresponding components together', () => {
      const point = new Point(-0.25, 33, 40)
      point.add(new Vector(-0.75, -44, 2))
      expect(point.equals(new Point(-1, -11, 42))).toBeTruthy()
    })
  })
})

describe('Vector', () => {
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

  describe('add', () => {
    test('Should be the same as adding the corresponding components together', () => {
      const vector = new Vector(-0.25, 33, 40)
      vector.add(new Vector(-0.75, -44, 2))
      expect(vector.equals(new Vector(-1, -11, 42))).toBeTruthy()
    })
  })
})

import { Point, Vector, Matrix } from '~src/geometry/geometry'

describe('Point', () => {
  test('toText', () => {
    expect(new Point(1, 2, 3).toText()).toEqual('(1, 2, 3)')
    expect(new Point(-37, 2.557, 1e5).toText()).toEqual('(-37, 2.557, 100000)')
  })

  describe('equals', () => {
    test('Should return true for equal points', () => {
      expect(
        new Point(1, 5.25, -23).equals(new Point(1, 5.25, -23))
      ).toBeTruthy()
      expect(
        new Point(1e5, 0.003, -5.33).equals(new Point(1e5, 0.003, -5.33))
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
    expect(point).toEqualPoint(new Point(-1, -11, 42))
  })

  test('subtract', () => {
    const point = new Point(-0.25, 33, 40)
    point.subtract(new Vector(-0.75, -44, 2))
    expect(point).toEqualPoint(new Point(0.5, 77, 38))
  })
})

describe('Vector', () => {
  test('toText', () => {
    expect(new Vector(1, 2, 3).toText()).toEqual('[1, 2, 3]')
    expect(new Vector(-37, 2.557, 1e5).toText()).toEqual('[-37, 2.557, 100000]')
  })

  test('length', () => {
    expect(new Vector(1, 0, 0).length()).toBe(1)
    expect(new Vector(0, 1, 0).length()).toBe(1)
    expect(new Vector(0, 0, 1).length()).toBe(1)
    expect(new Vector(1, 2, 3).length()).toBeCloseTo(Math.sqrt(14))
    expect(new Vector(-1, -2, -3).length()).toBeCloseTo(Math.sqrt(14))
  })

  describe('equals', () => {
    test('Should return true for equal vectors', () => {
      expect(
        new Vector(1, 5.25, -23).equals(new Vector(1, 5.25, -23))
      ).toBeTruthy()
      expect(
        new Vector(1e5, 0.003, -5.33).equals(new Vector(1e5, 0.003, -5.33))
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
    expect(vector).toEqualVector(new Vector(-1, -11, 42))
  })

  test('subtract', () => {
    const vector = new Vector(-0.25, 33, 40)
    vector.subtract(new Vector(-0.75, -44, 2))
    expect(vector).toEqualVector(new Vector(0.5, 77, 38))
  })

  test('multiply', () => {
    const vector = new Vector(1, -2, 3)
    vector.multiply(3.5)
    expect(vector).toEqualVector(new Vector(3.5, -7, 10.5))

    vector.multiply(0.5)
    expect(vector).toEqualVector(new Vector(1.75, -3.5, 5.25))
  })

  test('divide', () => {
    const vector = new Vector(1, -2, 3)
    vector.divide(2)
    expect(vector).toEqualVector(new Vector(0.5, -1, 1.5))
  })

  test('negate', () => {
    const vector = new Vector(-0.25, 33, 40)
    vector.negate()
    expect(vector).toEqualVector(new Vector(0.25, -33, -40))
  })

  test('normalize', () => {
    const vector = new Vector(4, 0, 0)
    vector.normalize()
    expect(vector).toEqualVector(new Vector(1, 0, 0))
    expect(vector.length()).toBe(1)

    const vector2 = new Vector(1, 2, 3)
    vector2.normalize()
    expect(vector2).toEqualVector(
      new Vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))
    )
    expect(vector2.length()).toBeCloseTo(1)
  })
})

describe('Matrix', () => {
  test('Should be the identity matrix by default', () => {
    const identityMatrix = new Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ])
    expect(new Matrix()).toEqualMatrix(identityMatrix)
  })

  test('toText', () => {
    expect(new Matrix().toText()).toEqual(
      '[1, 0, 0, 0\n' + '0, 1, 0, 0\n' + '0, 0, 1, 0\n' + '0, 0, 0, 1]'
    )
  })

  describe('equals', () => {
    test('Should return true for equal matrices', () => {
      expect(
        new Matrix([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [8, 7, 6, 5],
          [4, 3, 2, 1]
        ]).equals(
          new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [8, 7, 6, 5], [4, 3, 2, 1]])
        )
      ).toBeTruthy()
    })

    test('Should return false for unequal matrices', () => {
      expect(
        new Matrix([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [8, 7, 6, 5],
          [4, 3, 2, 1]
        ]).equals(
          new Matrix([[2, 3, 4, 5], [6, 7, 8, 9], [9, 8, 7, 6], [5, 4, 3, 2]])
        )
      ).toBeFalsy()
    })

    test('Should handle floating point errors', () => {
      expect(
        new Matrix([
          [1.0000001, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]
        ]).equals(new Matrix())
      ).toBeTruthy()
    })
  })
})

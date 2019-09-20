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

  test('set', () => {
    const point = new Point(1, 2, 3)
    point.set(new Point(3, 2, 1))
    expect(point).toEqualPoint(new Point(3, 2, 1))
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

  test('multiply', () => {
    const point = new Point(1, -2, 3)
    point.multiply(3.5)
    expect(point).toEqualPoint(new Point(3.5, -7, 10.5))

    point.multiply(0.5)
    expect(point).toEqualPoint(new Point(1.75, -3.5, 5.25))
  })

  test('divide', () => {
    const point = new Point(1, -2, 3)
    point.divide(2)
    expect(point).toEqualPoint(new Point(0.5, -1, 1.5))
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

  test('set', () => {
    const vector = new Vector(1, 2, 3)
    vector.set(new Vector(3, 2, 1))
    expect(vector).toEqualVector(new Vector(3, 2, 1))
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

  describe('multiply', () => {
    describe('multiplyPoint', () => {
      test('Should let you multiply a point by the matrix', () => {
        const matrix = new Matrix([
          [1, 2, 3, 0],
          [2, 4, 4, 0],
          [8, 6, 4, 0],
          [0, 0, 0, 1]
        ])
        const point = new Point(1, 2, 3)
        expect(matrix.multiplyPoint(point)).toEqualPoint(new Point(14, 22, 32))
      })

      test('Should divide the point by the homogeneous weight', () => {
        const matrix = new Matrix([
          [1, 2, 3, 0],
          [2, 4, 4, 0],
          [8, 6, 4, 0],
          [0, 0, 0, 2]
        ])
        const point = new Point(1, 2, 3)
        expect(matrix.multiplyPoint(point)).toEqualPoint(new Point(7, 11, 16))
      })

      test("Should take the matrix's 4th basis vector into account", () => {
        const matrix = new Matrix([
          [1, 2, 3, 4],
          [2, 4, 4, 2],
          [8, 6, 4, 2],
          [0, 0, 0, 1]
        ])
        const point = new Point(1, 2, 3)
        expect(matrix.multiplyPoint(point)).toEqualPoint(new Point(18, 24, 34))
      })
    })

    describe('multiplyVector', () => {
      test('Should let you multiply a vector by the matrix', () => {
        const matrix = new Matrix([
          [1, 2, 3, 4],
          [2, 4, 4, 2],
          [8, 6, 4, 1],
          [0, 0, 0, 1]
        ])
        const vector = new Vector(1, 2, 3)
        expect(matrix.multiplyVector(vector)).toEqualVector(
          new Vector(14, 22, 32)
        )
      })

      test("Should ignore the matrix's 4th basis vector", () => {
        const matrix = new Matrix([
          [1, 2, 3, 369],
          [2, 4, 4, 42],
          [8, 6, 4, 0.5678],
          [0, 0, 0, -42]
        ])
        const vector = new Vector(1, 2, 3)
        expect(matrix.multiplyVector(vector)).toEqualVector(
          new Vector(14, 22, 32)
        )
      })
    })

    test('multiplyMatrix', () => {
      const a = new Matrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      ])
      const b = new Matrix([
        [-2, 1, 2, 3],
        [3, 2, 1, -1],
        [4, 3, 6, 5],
        [1, 2, 7, 8]
      ])

      expect(a.multiplyMatrix(b)).toEqualMatrix(
        new Matrix([
          [20, 22, 50, 48],
          [44, 54, 114, 108],
          [40, 58, 110, 102],
          [16, 26, 46, 42]
        ])
      )
    })
  })

  describe('transpose', () => {
    test('Should return the transposed matrix', () => {
      const matrix = new Matrix([
        [0, 9, 3, 0],
        [9, 8, 0, 8],
        [1, 8, 5, 3],
        [0, 0, 5, 8]
      ])
      expect(matrix.transpose()).toEqualMatrix(
        new Matrix([[0, 9, 1, 0], [9, 8, 8, 0], [3, 0, 5, 5], [0, 8, 3, 8]])
      )
    })

    test('Transposing the identity matrix should give the identity matrix', () => {
      expect(new Matrix().transpose()).toEqualMatrix(new Matrix())
    })
  })

  describe('inverse', () => {
    test('Should return the inverted matrix', () => {
      let matrix = new Matrix([
        [-5, 2, 6, -8],
        [1, -5, 1, 8],
        [7, 7, -6, -7],
        [1, -3, 7, 4]
      ])
      expect(matrix.inverse()).toEqualMatrix(
        new Matrix([
          [0.21805, 0.45113, 0.2406, -0.04511],
          [-0.80827, -1.45677, -0.44361, 0.52068],
          [-0.07895, -0.22368, -0.05263, 0.19737],
          [-0.52256, -0.81391, -0.30075, 0.30639]
        ])
      )

      matrix = new Matrix([
        [8, -5, 9, 2],
        [7, 5, 6, 1],
        [-6, 0, 9, 6],
        [-3, 0, -9, -4]
      ])
      expect(matrix.inverse()).toEqualMatrix(
        new Matrix([
          [-0.15385, -0.15385, -0.28205, -0.53846],
          [-0.07692, 0.12308, 0.02564, 0.03077],
          [0.35897, 0.35897, 0.4359, 0.92308],
          [-0.69231, -0.69231, -0.76923, -1.92308]
        ])
      )

      matrix = new Matrix([
        [9, 3, 0, 9],
        [-5, -2, -6, -3],
        [-4, 9, 6, 4],
        [-7, 6, 6, 2]
      ])
      expect(matrix.inverse()).toEqualMatrix(
        new Matrix([
          [-0.04074, -0.07778, 0.14444, -0.22222],
          [-0.07778, 0.03333, 0.36667, -0.33333],
          [-0.02901, -0.1463, -0.10926, 0.12963],
          [0.17778, 0.06667, -0.26667, 0.33333]
        ])
      )
    })

    test('Multiplying a matrix by its inverse returns the identity matrix', () => {
      const matrix = new Matrix([
        [3, -9, 7, 3],
        [3, -8, 2, -9],
        [-4, 4, 4, 1],
        [-6, 5, -1, 1]
      ])
      expect(matrix.multiplyMatrix(matrix.inverse())).toEqualMatrix(
        new Matrix()
      )
      expect(matrix.inverse().multiplyMatrix(matrix)).toEqualMatrix(
        new Matrix()
      )
    })

    test('Multiplying a matrix product by the inverse of the right factor returns the left factor', () => {
      const matrix = new Matrix([
        [3, -9, 7, 3],
        [3, -8, 2, -9],
        [-4, 4, 4, 1],
        [-6, 5, -1, 1]
      ])
      const matrix2 = new Matrix([
        [8, 2, 2, 2],
        [3, -1, 7, 0],
        [7, 0, 5, 4],
        [6, -2, 0, 5]
      ])
      const matrixProduct = matrix.multiplyMatrix(matrix2)
      expect(matrixProduct.multiplyMatrix(matrix2.inverse())).toEqualMatrix(
        matrix
      )
    })

    test("Should throw if the matrix isn't invertible", () => {
      const matrix = new Matrix([
        [3, -9, 7, 3],
        [3, -8, 2, -9],
        [-4, 4, 4, 1],
        [0, 0, 0, 0]
      ])
      expect(() => {
        matrix.inverse()
      }).toThrow()
    })
  })
})

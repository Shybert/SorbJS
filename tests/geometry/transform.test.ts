import { Transform } from '~src/geometry/transform'
import { Matrix, Point, Vector } from '~src/geometry/geometry'

describe('Transform', () => {
  test('Should initialize to the identity transformation by default', () => {
    const transform = new Transform()
    const identityTransform = new Transform(
      new Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
    )
    expect(transform).toEqualTransform(identityTransform)
  })

  test('toText', () => {
    expect(new Transform().toText()).toEqual(
      '[1, 0, 0, 0\n' + '0, 1, 0, 0\n' + '0, 0, 1, 0\n' + '0, 0, 0, 1]'
    )
  })

  describe('equals', () => {
    test('Should return true for equal transformations', () => {
      const a = new Transform().translate(1, 2, 3)
      const b = new Transform().translate(1, 2, 3)
      expect(a.equals(b)).toBeTruthy()
    })

    test('Should return false for unequal transformations', () => {
      const a = new Transform().translate(1, 2, 3)
      const b = new Transform().translate(3, 2, 1)
      expect(a.equals(b)).toBeFalsy()
    })

    test('Should handle floating point errors', () => {
      expect(
        new Transform(
          new Matrix([
            [1.0000001, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
          ])
        ).equals(new Transform())
      ).toBeTruthy()
    })
  })

  describe('transpose', () => {
    test('Should return the transposed transformation', () => {
      const transform = new Transform(
        new Matrix([[0, 9, 3, 0], [9, 8, 0, 8], [1, 8, 5, 3], [0, 0, 5, 8]])
      )
      expect(transform.transpose()).toEqualTransform(
        new Transform(
          new Matrix([[0, 9, 1, 0], [9, 8, 8, 0], [3, 0, 5, 5], [0, 8, 3, 8]])
        )
      )
    })

    test('Transposing the identity transformation should return the identity transformation', () => {
      expect(new Matrix().transpose()).toEqualMatrix(new Matrix())
    })
  })

  test('inverse', () => {
    const translationTransform = new Transform().translate(1, 2, 3)
    expect(translationTransform.inverse()).toEqualTransform(
      new Transform().translate(-1, -2, -3)
    )

    const scaleTransform = new Transform().scale(5, 5, 5)
    expect(scaleTransform.inverse()).toEqualTransform(
      new Transform().scale(1 / 5, 1 / 5, 1 / 5)
    )

    const rotationTransform = new Transform().rotateY(Math.PI)
    expect(rotationTransform.inverse()).toEqualTransform(
      rotationTransform.transpose()
    )
  })

  describe('translate', () => {
    test('Should transform the transformation to a translation transformation', () => {
      const transform = new Transform()
      const translationTransform = new Transform(
        new Matrix([[1, 0, 0, 1], [0, 1, 0, 2], [0, 0, 1, 3], [0, 0, 0, 1]])
      )

      transform.translate(1, 2, 3)
      expect(transform).toEqualTransform(translationTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.translate(1, 2, 3)).toBe(transform)
    })
  })

  describe('scale', () => {
    test('Should transform the transformation to a scale transformation', () => {
      const transform = new Transform()
      const scaleTransform = new Transform(
        new Matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 1]])
      )

      transform.scale(1, 2, 3)
      expect(transform).toEqualTransform(scaleTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.scale(1, 2, 3)).toBe(transform)
    })
  })

  describe('rotateX', () => {
    test('Should transform the transformation to a rotation transformation around the x-axis', () => {
      const transform = new Transform()
      const angle = Math.PI / 6
      const sinAngle = Math.sin(angle)
      const cosAngle = Math.cos(angle)
      const rotationTransform = new Transform(
        new Matrix([
          [1, 0, 0, 0],
          [0, cosAngle, -sinAngle, 0],
          [0, sinAngle, cosAngle, 0],
          [0, 0, 0, 1]
        ])
      )

      transform.rotateX(angle)
      expect(transform).toEqualTransform(rotationTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.rotateX(Math.PI)).toBe(transform)
    })
  })

  describe('rotateY', () => {
    test('Should transform the transformation to a rotation transformation around the y-axis', () => {
      const transform = new Transform()
      const angle = Math.PI / 6
      const sinAngle = Math.sin(angle)
      const cosAngle = Math.cos(angle)
      const rotationTransform = new Transform(
        new Matrix([
          [cosAngle, 0, sinAngle, 0],
          [0, 1, 0, 0],
          [-sinAngle, 0, cosAngle, 0],
          [0, 0, 0, 1]
        ])
      )

      transform.rotateY(angle)
      expect(transform).toEqualTransform(rotationTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.rotateY(Math.PI)).toBe(transform)
    })
  })

  describe('rotateZ', () => {
    test('Should transform the transformation to a rotation transformation around the z-axis', () => {
      const transform = new Transform()
      const angle = Math.PI / 6
      const sinAngle = Math.sin(angle)
      const cosAngle = Math.cos(angle)
      const rotationTransform = new Transform(
        new Matrix([
          [cosAngle, -sinAngle, 0, 0],
          [sinAngle, cosAngle, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]
        ])
      )

      transform.rotateZ(angle)
      expect(transform).toEqualTransform(rotationTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.rotateZ(Math.PI)).toBe(transform)
    })
  })

  describe('shear', () => {
    test('Should be able to transform the transformation to a shear moving x in proportion to y', () => {
      const transform = new Transform()
      const shearTransform = new Transform(
        new Matrix([[1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
      )

      transform.shear({ xy: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving x in proportion to z', () => {
      const transform = new Transform()
      const shearTransform = new Transform(
        new Matrix([[1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
      )

      transform.shear({ xz: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving y in proportion to x', () => {
      const transform = new Transform()
      const shearTransform = new Transform(
        new Matrix([[1, 0, 0, 0], [1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
      )

      transform.shear({ yx: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving y in proportion to z', () => {
      const transform = new Transform()
      const shearTransform = new Transform(
        new Matrix([[1, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
      )

      transform.shear({ yz: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving z in proportion to x', () => {
      const transform = new Transform()
      const shearTransform = new Transform(
        new Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [1, 0, 1, 0], [0, 0, 0, 1]])
      )

      transform.shear({ zx: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving z in proportion to y', () => {
      const transform = new Transform()
      const shearTransform = new Transform(
        new Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 1]])
      )

      transform.shear({ zy: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should support multiple shears in a single call', () => {
      const transform = new Transform()
      const shearTransform = new Transform(
        new Matrix([[1, 1, 2, 0], [3, 1, 4, 0], [5, 6, 1, 0], [0, 0, 0, 1]])
      )

      transform.shear({ xy: 1, xz: 2, yx: 3, yz: 4, zx: 5, zy: 6 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.shear({ xy: 1, yz: 1, zx: 1 })).toBe(transform)
    })
  })

  test('Should support compositing transformations', () => {
    const transform = new Transform()
    const compositedTransform = new Transform(
      new Matrix([[5, 0, 0, 10], [0, 0, -5, 5], [0, 5, 0, 7], [0, 0, 0, 1]])
    )

    transform
      .rotateX(Math.PI / 2)
      .scale(5, 5, 5)
      .translate(10, 5, 7)
    expect(transform).toEqualTransform(compositedTransform)
  })

  describe('transformPoint', () => {
    test('Should let you translate a point', () => {
      const point = new Point(-3, 4, 5)
      const translation = new Transform().translate(5, -3, 2)

      expect(translation.transformPoint(point)).toEqualPoint(new Point(2, 1, 7))
    })

    describe('scale', () => {
      test('Should let you scale a point', () => {
        const point = new Point(-3, 4, 5)
        const scale = new Transform().scale(1, 2, 3)

        expect(scale.transformPoint(point)).toEqualPoint(new Point(-3, 8, 15))
      })

      test('Should let you reflect a point by scaling by negative values', () => {
        const point = new Point(-3, 4, 5)
        const scale = new Transform().scale(-1, -1, -1)

        expect(scale.transformPoint(point)).toEqualPoint(new Point(3, -4, -5))
      })
    })

    test('Should let you rotate a point around the x-axis', () => {
      const point = new Point(0, 1, 0)
      const rotation = new Transform().rotateX(Math.PI / 2)

      expect(rotation.transformPoint(point)).toEqualPoint(new Point(0, 0, 1))
    })

    test('Should let you rotate a point around the y-axis', () => {
      const point = new Point(1, 0, 0)
      const rotation = new Transform().rotateY(Math.PI / 2)

      expect(rotation.transformPoint(point)).toEqualPoint(new Point(0, 0, -1))
    })

    test('Should let you rotate a point around the z-axis', () => {
      const point = new Point(0, 1, 0)
      const rotation = new Transform().rotateZ(Math.PI / 2)

      expect(rotation.transformPoint(point)).toEqualPoint(new Point(-1, 0, 0))
    })

    describe('shear', () => {
      test('Should let you move x in proportion to y', () => {
        const point = new Point(2, 3, 4)
        const shear = new Transform().shear({ xy: 1 })

        expect(shear.transformPoint(point)).toEqualPoint(new Point(5, 3, 4))
      })

      test('Should let you move x in proportion to z', () => {
        const point = new Point(2, 3, 4)
        const shear = new Transform().shear({ xz: 1 })

        expect(shear.transformPoint(point)).toEqualPoint(new Point(6, 3, 4))
      })

      test('Should let you move y in proportion to x', () => {
        const point = new Point(2, 3, 4)
        const shear = new Transform().shear({ yx: 1 })

        expect(shear.transformPoint(point)).toEqualPoint(new Point(2, 5, 4))
      })

      test('Should let you move y in proportion to z', () => {
        const point = new Point(2, 3, 4)
        const shear = new Transform().shear({ yz: 1 })

        expect(shear.transformPoint(point)).toEqualPoint(new Point(2, 7, 4))
      })

      test('Should let you move z in proportion to x', () => {
        const point = new Point(2, 3, 4)
        const shear = new Transform().shear({ zx: 1 })

        expect(shear.transformPoint(point)).toEqualPoint(new Point(2, 3, 6))
      })

      test('Should let you move z in proportion to y', () => {
        const point = new Point(2, 3, 4)
        const shear = new Transform().shear({ zy: 1 })

        expect(shear.transformPoint(point)).toEqualPoint(new Point(2, 3, 7))
      })
    })

    test('Should work with a composited transformation', () => {
      const point = new Point(1, 0, 1)
      const compositedTransform = new Transform()
        .rotateX(Math.PI / 2)
        .scale(5, 5, 5)
        .translate(10, 5, 7)

      expect(compositedTransform.transformPoint(point)).toEqualPoint(
        new Point(15, 0, 7)
      )
    })
  })

  describe('transformVector', () => {
    test('Translations should not affect vectors', () => {
      const vector = new Vector(-3, 4, 5)
      const translation = new Transform().translate(5, -3, 2)

      expect(translation.transformVector(vector)).toEqualVector(
        new Vector(-3, 4, 5)
      )
    })

    describe('scale', () => {
      test('Should let you scale a vector', () => {
        const vector = new Vector(-3, 4, 5)
        const scale = new Transform().scale(1, 2, 3)

        expect(scale.transformVector(vector)).toEqualVector(
          new Vector(-3, 8, 15)
        )
      })

      test('Should let you reflect a vector by scaling by negative values', () => {
        const vector = new Vector(-3, 4, 5)
        const scale = new Transform().scale(-1, -1, -1)

        expect(scale.transformVector(vector)).toEqualVector(
          new Vector(3, -4, -5)
        )
      })
    })

    test('Should let you rotate a vector around the x-axis', () => {
      const vector = new Vector(0, 1, 0)
      const rotation = new Transform().rotateX(Math.PI / 2)

      expect(rotation.transformVector(vector)).toEqualVector(
        new Vector(0, 0, 1)
      )
    })

    test('Should let you rotate a vector around the y-axis', () => {
      const vector = new Vector(1, 0, 0)
      const rotation = new Transform().rotateY(Math.PI / 2)

      expect(rotation.transformVector(vector)).toEqualVector(
        new Vector(0, 0, -1)
      )
    })

    test('Should let you rotate a vector around the z-axis', () => {
      const vector = new Vector(0, 1, 0)
      const rotation = new Transform().rotateZ(Math.PI / 2)

      expect(rotation.transformVector(vector)).toEqualVector(
        new Vector(-1, 0, 0)
      )
    })

    describe('shear', () => {
      test('Should let you move x in proportion to y', () => {
        const vector = new Vector(2, 3, 4)
        const shear = new Transform().shear({ xy: 1 })

        expect(shear.transformVector(vector)).toEqualVector(new Vector(5, 3, 4))
      })

      test('Should let you move x in proportion to z', () => {
        const vector = new Vector(2, 3, 4)
        const shear = new Transform().shear({ xz: 1 })

        expect(shear.transformVector(vector)).toEqualVector(new Vector(6, 3, 4))
      })

      test('Should let you move y in proportion to x', () => {
        const vector = new Vector(2, 3, 4)
        const shear = new Transform().shear({ yx: 1 })

        expect(shear.transformVector(vector)).toEqualVector(new Vector(2, 5, 4))
      })

      test('Should let you move y in proportion to z', () => {
        const vector = new Vector(2, 3, 4)
        const shear = new Transform().shear({ yz: 1 })

        expect(shear.transformVector(vector)).toEqualVector(new Vector(2, 7, 4))
      })

      test('Should let you move z in proportion to x', () => {
        const vector = new Vector(2, 3, 4)
        const shear = new Transform().shear({ zx: 1 })

        expect(shear.transformVector(vector)).toEqualVector(new Vector(2, 3, 6))
      })

      test('Should let you move z in proportion to y', () => {
        const vector = new Vector(2, 3, 4)
        const shear = new Transform().shear({ zy: 1 })

        expect(shear.transformVector(vector)).toEqualVector(new Vector(2, 3, 7))
      })
    })

    test('Should work with a composited transformation', () => {
      const vector = new Vector(1, 0, 1)
      const compositedTransform = new Transform()
        .rotateX(Math.PI / 2)
        .scale(5, 5, 5)
        .shear({ xy: 2 })

      expect(compositedTransform.transformVector(vector)).toEqualVector(
        new Vector(-5, -5, 0)
      )
    })
  })
})

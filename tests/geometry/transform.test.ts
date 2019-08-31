import { Transform } from '~src/geometry/transform'

describe('Transform', () => {
  test('Should initialize to the identity transformation by default', () => {
    const transform = new Transform()
    const identityTransform = new Transform([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ])
    expect(transform).toEqualTransform(identityTransform)
  })

  describe('translate', () => {
    test('Should transform the transformation to a translation transformation', () => {
      const transform = new Transform()
      const translationTransform = new Transform([
        [1, 0, 0, 1],
        [0, 1, 0, 2],
        [0, 0, 1, 3],
        [0, 0, 0, 1]
      ])

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
      const scaleTransform = new Transform([
        [1, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 1]
      ])

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
      const rotationTransform = new Transform([
        [1, 0, 0, 0],
        [0, cosAngle, -sinAngle, 0],
        [0, sinAngle, cosAngle, 0],
        [0, 0, 0, 1]
      ])

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
      const rotationTransform = new Transform([
        [cosAngle, 0, sinAngle, 0],
        [0, 1, 0, 0],
        [-sinAngle, 0, cosAngle, 0],
        [0, 0, 0, 1]
      ])

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
      const rotationTransform = new Transform([
        [cosAngle, -sinAngle, 0, 0],
        [sinAngle, cosAngle, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ])

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
      const shearTransform = new Transform([
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ])

      transform.shear({ xy: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving x in proportion to z', () => {
      const transform = new Transform()
      const shearTransform = new Transform([
        [1, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ])

      transform.shear({ xz: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving y in proportion to x', () => {
      const transform = new Transform()
      const shearTransform = new Transform([
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ])

      transform.shear({ yx: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving y in proportion to z', () => {
      const transform = new Transform()
      const shearTransform = new Transform([
        [1, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ])

      transform.shear({ yz: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving z in proportion to x', () => {
      const transform = new Transform()
      const shearTransform = new Transform([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 0, 1, 0],
        [0, 0, 0, 1]
      ])

      transform.shear({ zx: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should be able to transform the transformation to a shear moving z in proportion to y', () => {
      const transform = new Transform()
      const shearTransform = new Transform([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 1]
      ])

      transform.shear({ zy: 1 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should support multiple shears in a single call', () => {
      const transform = new Transform()
      const shearTransform = new Transform([
        [1, 1, 2, 0],
        [3, 1, 4, 0],
        [5, 6, 1, 0],
        [0, 0, 0, 1]
      ])

      transform.shear({ xy: 1, xz: 2, yx: 3, yz: 4, zx: 5, zy: 6 })
      expect(transform).toEqualTransform(shearTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.shear({ xy: 1, yz: 1, zx: 1 })).toBe(transform)
    })
  })
})

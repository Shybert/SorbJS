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
})

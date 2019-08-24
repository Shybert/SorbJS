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
      transform.translate(1, 2, 3)
      const translationTransform = new Transform([
        [1, 0, 0, 1],
        [0, 1, 0, 2],
        [0, 0, 1, 3],
        [0, 0, 0, 1]
      ])
      expect(transform).toEqualTransform(translationTransform)
    })

    test('Should return the transformation', () => {
      const transform = new Transform()
      expect(transform.translate(1, 2, 3)).toBe(transform)
    })
  })
})

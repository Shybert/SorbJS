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
})

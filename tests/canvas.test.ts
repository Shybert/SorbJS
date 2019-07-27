import { Color } from '~canvas'

describe('Color', () => {
  test('toText', () => {
    expect(new Color(1, 2, 3).toText()).toEqual('(1, 2, 3)')
    expect(new Color(-37, 2.557, 1e5).toText()).toEqual('(-37, 2.557, 100000)')
  })

  describe('equals', () => {
    test('Should return true for equal colors', () => {
      expect(
        new Color(1, 5.25, -23).equals(new Color(1, 5.25, -23))
      ).toBeTruthy()
      expect(
        new Color(1e5, 0.003, -5.33).equals(new Color(1e5, 0.003, -5.33))
      ).toBeTruthy()
    })

    test('Should return false for unequal colors', () => {
      expect(
        new Color(1, 5.33, -23).equals(new Color(1e10, 5.00005, 99.887))
      ).toBeFalsy()
    })
  })
})

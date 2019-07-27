import { Color, Canvas } from '~canvas'

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

describe('Canvas', () => {
  describe('Initialization', () => {
    test('Should have the passed width', () => {
      const canvas = new Canvas(10, 20)
      expect(canvas.width).toBe(10)
    })

    test('Should have the passed height', () => {
      const canvas = new Canvas(10, 20)
      expect(canvas.height).toBe(20)
    })

    test('Should initialize all pixels as black', () => {
      const canvas = new Canvas(10, 20)
      const black = new Color(0, 0, 0)
      for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 20; j += 1) {
          expect(canvas.getPixel(i, j)).toEqualColor(black)
        }
      }
    })
  })

  describe('getPixel', () => {
    test('Should return the color of the pixel', () => {
      // TODO
    })

    test('Should clamp passed x & y values', () => {
      // TODO
    })
  })
})

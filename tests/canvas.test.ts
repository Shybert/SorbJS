import { Color, Canvas } from '~src/canvas'

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
    const canvas = new Canvas(10, 20)

    test('Should have the passed width', () => {
      expect(canvas.width).toBe(10)
    })

    test('Should have the passed height', () => {
      expect(canvas.height).toBe(20)
    })

    test('Should initialize all pixels as black', () => {
      const black = new Color(0, 0, 0)
      for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 20; j += 1) {
          expect(canvas.getPixel(i, j)).toEqualColor(black)
        }
      }
    })
  })

  describe('getPixel', () => {
    const canvas = new Canvas(10, 20)
    const color = new Color(255, 0, 102)
    canvas.setPixel(0, 0, color)
    canvas.setPixel(10, 20, color)
    canvas.setPixel(2, 3, color)

    test('Should get the color of pixels', () => {
      expect(canvas.getPixel(2, 3)).toEqualColor(color)
    })

    test('Should clamp pixel coordinates', () => {
      expect(canvas.getPixel(-1, -1)).toEqualColor(color)

      expect(canvas.getPixel(15, 25)).toEqualColor(color)
    })

    test('Should round pixel coordinates', () => {
      expect(canvas.getPixel(2.3, 2.8)).toEqualColor(color)
    })
  })

  describe('setPixel', () => {
    const canvas = new Canvas(10, 20)
    const color = new Color(255, 0, 102)

    test('Should set the color of pixels', () => {
      canvas.setPixel(2, 3, color)
      expect(canvas.getPixel(2, 3)).toEqualColor(color)
    })

    test('Should clamp pixel coordinates', () => {
      canvas.setPixel(-1, -1, color)
      expect(canvas.getPixel(0, 0)).toEqualColor(color)

      canvas.setPixel(15, 25, color)
      expect(canvas.getPixel(10, 20)).toEqualColor(color)
    })

    test('Should round pixel coordinates', () => {
      canvas.setPixel(1.34, 7.6, color)
      expect(canvas.getPixel(1, 8)).toEqualColor(color)
    })
  })
})

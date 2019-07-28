import { almostEquals, clampNumber } from '~src/utils'

describe('almostEquals', () => {
  test('Should return true for equal numbers', () => {
    expect(almostEquals(1, 1)).toBeTruthy()
    expect(almostEquals(-4, -4)).toBeTruthy()
    expect(almostEquals(1e5, 1e5)).toBeTruthy()
  })

  test('Should return true for numbers with a difference < 0.00001', () => {
    expect(almostEquals(0.0000001, 0.0000002)).toBeTruthy()
    expect(almostEquals(-4, -4.0000003)).toBeTruthy()
    expect(almostEquals(1e5, 1.00000000009e5)).toBeTruthy()
  })

  test('Should return false for numbers with a difference >= 0.00001', () => {
    expect(almostEquals(3, 4)).toBeFalsy()
    expect(almostEquals(-4, -4.1)).toBeFalsy()
    expect(almostEquals(1e5, 1.001e5)).toBeFalsy()
  })
})

describe('clampNumber', () => {
  test('Should return the number if the number is within the range', () => {
    expect(clampNumber(3, 1, 4)).toBe(3)
  })

  test('Should return the min value if the number is less than min', () => {
    expect(clampNumber(1, 2, 3)).toBe(2)
    expect(clampNumber(-1, 0, 1)).toBe(0)
    expect(clampNumber(1.33, 1.34, 2)).toBeCloseTo(1.34, 4)
  })

  test('Should return the max value if the number is larger than max', () => {
    expect(clampNumber(42, 1, 2)).toBe(2)
    expect(clampNumber(42.1, 0, 42.05)).toBeCloseTo(42.05, 4)
  })
})

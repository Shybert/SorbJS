import { almostEquals } from '../src/utils'

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

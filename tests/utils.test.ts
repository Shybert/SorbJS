import { floatingPointEquals } from '../src/utils'

describe('floatingPointEquals', () => {
  test('Should return true for equal numbers', () => {
    expect(floatingPointEquals(1, 1)).toBeTruthy()
    expect(floatingPointEquals(-4, -4)).toBeTruthy()
    expect(floatingPointEquals(1e5, 1e5)).toBeTruthy()
  })

  test('Should return true for numbers with a difference < 0.00001', () => {
    expect(floatingPointEquals(0.0000001, 0.0000002)).toBeTruthy()
    expect(floatingPointEquals(-4, -4.0000003)).toBeTruthy()
    expect(floatingPointEquals(1e5, 1.00000000009e5)).toBeTruthy()
  })

  test('Should return false for numbers with a difference >= 0.00001', () => {
    expect(floatingPointEquals(3, 4)).toBeFalsy()
    expect(floatingPointEquals(-4, -4.1)).toBeFalsy()
    expect(floatingPointEquals(1e5, 1.001e5)).toBeFalsy()
  })
})

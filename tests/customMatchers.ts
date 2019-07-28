import { Vector, Point, Matrix } from '~src/geometry/geometry'
import { Color } from '~src/canvas'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualPoint(point: Point): R
      toEqualVector(vector: Vector): R
      toEqualMatrix(matrix: Matrix): R
      toEqualColor(color: Color): R
    }
  }
}

expect.extend({
  toEqualPoint(received, point) {
    if (!(received instanceof Point))
      return {
        message: () => `expected ${received} to be a vector`,
        pass: false
      }

    const pass = received.equals(point)
    return {
      message: () =>
        `expected ${received.toText()} to${
          pass ? ' not ' : ' '
        }equal ${point.toText()}`,
      pass
    }
  },

  toEqualVector(received, vector) {
    if (!(received instanceof Vector))
      return {
        message: () => `expected ${received} to be a vector`,
        pass: false
      }

    const pass = received.equals(vector)
    return {
      message: () =>
        `expected ${received.toText()} to${
          pass ? ' not ' : ' '
        }equal ${vector.toText()}`,
      pass
    }
  },

  toEqualMatrix(received, matrix) {
    if (!(received instanceof Matrix))
      return {
        message: () => `expected ${received} to be a matrix`,
        pass: false
      }

    const pass = received.equals(matrix)
    return {
      message: () =>
        `expected\n${received.toText()}\nto${
          pass ? ' not ' : ' '
        }equal\n${matrix.toText()}`,
      pass
    }
  },

  toEqualColor(received, color) {
    if (!(received instanceof Color))
      return {
        message: () => `expected ${received} to be a color`,
        pass: false
      }

    const pass = received.equals(color)
    return {
      message: () =>
        `expected ${received.toText()} to${
          pass ? ' not ' : ' '
        }equal ${color.toText()}`,
      pass
    }
  }
})

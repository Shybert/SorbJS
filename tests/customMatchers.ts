import { Vector, Point } from '../src/geometry/geometry'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualPoint(point: Point): R
      toEqualVector(vector: Vector): R
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
  }
})

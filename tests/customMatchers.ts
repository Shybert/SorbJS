import { Vector } from '../src/geometry/geometry'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualVector(vector: Vector): R
    }
  }
}

expect.extend({
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

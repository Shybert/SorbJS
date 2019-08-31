import { Vector, Point, Matrix } from '~src/geometry/geometry'
import { Transform } from '~src/geometry/transform'
import { Color } from '~src/canvas'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualPoint(point: Point): R
      toEqualVector(vector: Vector): R
      toEqualMatrix(matrix: Matrix): R
      toEqualTransform(transform: Transform): R
      toEqualColor(color: Color): R
    }
  }
}

expect.extend({
  toEqualPoint(received, point: Point) {
    if (!(received instanceof Point))
      return {
        message: () => `expected ${received} to be a point`,
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

  toEqualVector(received, vector: Vector) {
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

  toEqualMatrix(received, matrix: Matrix) {
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

  toEqualTransform(received, transform: Transform) {
    if (!(received instanceof Transform))
      return {
        message: () => `expected ${received} to be a transform`,
        pass: false
      }

    const pass = received.equals(transform)
    return {
      message: () =>
        `expected\n${received.toText()}\nto${
          pass ? ' not ' : ' '
        }equal\n${transform.toText()}`,
      pass
    }
  },

  toEqualColor(received, color: Color) {
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

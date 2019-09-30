import { Vector, Point, Matrix } from '~src/geometry/geometry'
import { Transform } from '~src/geometry/transform'
import { Color } from '~src/canvas'
import { Ray } from '~src/geometry/ray'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualPoint(point: Point): R
      toEqualVector(vector: Vector): R
      toEqualMatrix(matrix: Matrix): R
      toEqualTransform(transform: Transform): R
      toEqualRay(ray: Ray): R
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

  toEqualRay(received, ray: Ray) {
    if (!(received instanceof Ray))
      return {
        message: () => `expected ${received} to be a ray`,
        pass: false
      }

    const pass =
      received.origin.equals(ray.origin) &&
      received.direction.equals(ray.direction)
    return {
      message: () =>
        `expected origin ${received.origin.toText()} and direction ${received.direction.toText()} to${
          pass ? ' not ' : ' '
        }equal origin ${ray.origin.toText()} and direction ${ray.direction.toText()}`,
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

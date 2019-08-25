import { Matrix } from './geometry'
import { matrixMultiplication } from './math'

export class Transform extends Matrix {
  private multiplyAssign(matrix: Matrix): void {
    this.matrix = matrixMultiplication(this, matrix).matrix
  }

  public translate(x: number, y: number, z: number): this {
    this.multiplyAssign(
      new Matrix([[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]])
    )
    return this
  }

  public scale(x: number, y: number, z: number): this {
    this.multiplyAssign(
      new Matrix([[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]])
    )
    return this
  }

  public rotateX(angle: number): this {
    const sinAngle = Math.sin(angle)
    const cosAngle = Math.cos(angle)
    this.multiplyAssign(
      new Matrix([
        [1, 0, 0, 0],
        [0, cosAngle, -sinAngle, 0],
        [0, sinAngle, cosAngle, 0],
        [0, 0, 0, 1]
      ])
    )
    return this
  }

  public rotateY(angle: number): this {
    const sinAngle = Math.sin(angle)
    const cosAngle = Math.cos(angle)
    this.multiplyAssign(
      new Matrix([
        [cosAngle, 0, sinAngle, 0],
        [0, 1, 0, 0],
        [-sinAngle, 0, cosAngle, 0],
        [0, 0, 0, 1]
      ])
    )
    return this
  }
}

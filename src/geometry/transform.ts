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
}

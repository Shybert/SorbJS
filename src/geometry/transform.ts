import { Matrix } from './geometry'
import { matrixMultiplication } from './math'

interface IShear {
  xy?: number
  xz?: number
  yx?: number
  yz?: number
  zx?: number
  zy?: number
}

export class Transform {
  private matrix: Matrix
  constructor(matrix?: Matrix) {
    if (matrix) this.matrix = matrix
    else this.matrix = new Matrix()
  }

  toText(): string {
    return this.matrix.toText()
  }

  equals(transform: Transform): boolean {
    return this.matrix.equals(transform.matrix)
  }

  transpose(): Transform {
    return new Transform(this.matrix.transpose())
  }

  inverse(): Transform {
    return new Transform(this.matrix.inverse())
  }

  translate(x: number, y: number, z: number): this {
    this.matrix.multiplyAssign(
      new Matrix([[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]])
    )
    return this
  }

  scale(x: number, y: number, z: number): this {
    this.matrix.multiplyAssign(
      new Matrix([[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]])
    )
    return this
  }

  rotateX(angle: number): this {
    const sinAngle = Math.sin(angle)
    const cosAngle = Math.cos(angle)
    this.matrix.multiplyAssign(
      new Matrix([
        [1, 0, 0, 0],
        [0, cosAngle, -sinAngle, 0],
        [0, sinAngle, cosAngle, 0],
        [0, 0, 0, 1]
      ])
    )
    return this
  }

  rotateY(angle: number): this {
    const sinAngle = Math.sin(angle)
    const cosAngle = Math.cos(angle)
    this.matrix.multiplyAssign(
      new Matrix([
        [cosAngle, 0, sinAngle, 0],
        [0, 1, 0, 0],
        [-sinAngle, 0, cosAngle, 0],
        [0, 0, 0, 1]
      ])
    )
    return this
  }

  rotateZ(angle: number): this {
    const sinAngle = Math.sin(angle)
    const cosAngle = Math.cos(angle)
    this.matrix.multiplyAssign(
      new Matrix([
        [cosAngle, -sinAngle, 0, 0],
        [sinAngle, cosAngle, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ])
    )
    return this
  }

  shear({ xy = 0, xz = 0, yx = 0, yz = 0, zx = 0, zy = 0 }: IShear): this {
    this.matrix.multiplyAssign(
      new Matrix([[1, xy, xz, 0], [yx, 1, yz, 0], [zx, zy, 1, 0], [0, 0, 0, 1]])
    )
    return this
  }
}

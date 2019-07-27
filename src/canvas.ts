import { almostEquals } from '~utils'

export class Color {
  r: number
  g: number
  b: number
  constructor(r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
  }

  toText(): string {
    return `(${this.r}, ${this.g}, ${this.b})`
  }

  equals(color: Color) {
    return (
      almostEquals(this.r, color.r) &&
      almostEquals(this.g, color.g) &&
      almostEquals(this.b, color.b)
    )
  }
}

export class Canvas {
  private imageData: Color[]
  readonly width: number
  readonly height: number
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.imageData = new Array(this.width * this.height).fill(
      new Color(0, 0, 0)
    )
  }

  private getPixelIndex(x: number, y: number): number {
    return y * this.width + x
  }

  public getPixel(x: number, y: number): Color {
    return this.imageData[this.getPixelIndex(x, y)]
  }
}

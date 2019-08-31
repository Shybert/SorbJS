import { almostEquals, clampNumber } from '~src/utils'

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

  equals(color: Color): boolean {
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
    x = Math.round(clampNumber(x, 0, this.width))
    y = Math.round(clampNumber(y, 0, this.height))
    return y * this.width + x
  }

  getPixel(x: number, y: number): Color {
    return this.imageData[this.getPixelIndex(x, y)]
  }
  setPixel(x: number, y: number, color: Color): void {
    this.imageData[this.getPixelIndex(x, y)] = color
  }
}

export function renderCanvas(canvas: Canvas, element: HTMLCanvasElement): void {
  const ctx = element.getContext('2d') as CanvasRenderingContext2D
  element.width = canvas.width
  element.height = canvas.height
  const imageData = ctx.createImageData(canvas.width, canvas.height)

  for (let x = 0; x < canvas.width; x += 1) {
    for (let y = 0; y < canvas.height; y += 1) {
      const color = canvas.getPixel(x, y)
      const index = (x + y * canvas.width) * 4
      imageData.data[index] = color.r
      imageData.data[index + 1] = color.g
      imageData.data[index + 2] = color.b
      imageData.data[index + 3] = 255
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

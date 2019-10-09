import { Canvas, outputCanvas, Color } from '~src/canvas'
import { Point } from '~src/geometry/geometry'
import { Transform } from '~src/geometry/transform'

const canvas = new Canvas(800, 600)

for (let i = 0; i < 13; i += 1) {
  const angle = i * (Math.PI / 6)
  const transform = new Transform()
    .translate(0, 250, 0)
    .rotateZ(angle)
    .translate(canvas.width / 2, canvas.height / 2, 0) // Translate to the center of the canvas
  const point = transform.transformPoint(new Point(0, 0, 0))

  canvas.setPixel(point.x, point.y, new Color(255, 255, 255))
}

outputCanvas(canvas, document.getElementById('canvas') as HTMLCanvasElement)

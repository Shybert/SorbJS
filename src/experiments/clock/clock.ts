import { Canvas, renderCanvas, Color } from '~src/canvas'
import { Point } from '~src/geometry/geometry'
import { Transform } from '~src/geometry/transform'

const canvas = new Canvas(800, 600)

for (let i = 0; i < 13; i += 1) {
  const point = new Point(0, 0, 0)
  const angle = i * (Math.PI / 6)
  const transform = new Transform()
    .translate(0, 250, 0)
    .rotateZ(angle)
    .translate(canvas.width / 2, canvas.height / 2, 0) // Translate to the center of the canvas
  transform.transformPoint(point)

  canvas.setPixel(point.x, point.y, new Color(255, 255, 255))
}

renderCanvas(canvas, document.getElementById('canvas') as HTMLCanvasElement)

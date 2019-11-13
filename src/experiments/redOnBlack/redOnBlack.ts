import { Point, Vector } from '~src/geometry/geometry'
import { Canvas, Color, outputCanvas } from '~src/canvas'
import { Ray } from '~src/geometry/ray'
import { Sphere, hit } from '~src/geometry/shapes'

const red = new Color(255, 0, 0)
const black = new Color(0, 0, 0)

class Camera {
  canvas: Canvas
  aspectRatio: number
  fov: number
  constructor(canvasWidth: number, canvasHeight: number, fov: number) {
    this.canvas = new Canvas(canvasWidth, canvasHeight)
    this.aspectRatio = canvasWidth / canvasHeight
    this.fov = fov
  }

  render(spheres: Sphere[]): void {
    for (let i = 0; i <= this.canvas.width; i += 1) {
      for (let j = 0; j <= this.canvas.height; j += 1) {
        const computedFov = Math.tan(this.fov / 2)
        const x =
          (-1 + 2 * ((i + 0.5) / this.canvas.width)) *
          this.aspectRatio *
          computedFov
        const y = (1 - 2 * ((j + 0.5) / this.canvas.height)) * computedFov
        const ray = new Ray(new Point(0, 0, 0), new Vector(x, y, 1))

        const intersections = spheres.flatMap(sphere => sphere.intersect(ray))
        const rayHit = hit(intersections)
        this.canvas.setPixel(i, j, rayHit ? red : black)
      }
    }
  }
}

const sphere = new Sphere()
sphere.transform.translate(0, 0, 2)
const cornerSphere = new Sphere()
cornerSphere.transform.translate(3, 3, 2)
const shearedSphere = new Sphere()
shearedSphere.transform.translate(0, 0, 2).shear({ xy: 1 })

const camera = new Camera(600, 600, Math.PI / 2)
camera.render([sphere, cornerSphere, shearedSphere])
outputCanvas(
  camera.canvas,
  document.getElementById('canvas') as HTMLCanvasElement
)

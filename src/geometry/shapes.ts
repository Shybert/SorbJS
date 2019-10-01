import { Ray } from './ray'
import { quadratic } from './math'
import { Transform } from './transform'

type TShape = Sphere
interface IIntersection {
  t: number
  object: TShape
}
function intersection(t: number, object: TShape): IIntersection {
  return { t, object }
}

export function hit(intersections: IIntersection[]): IIntersection | undefined {
  let hit: IIntersection | undefined
  intersections.forEach(intersection => {
    if (intersection.t >= 0 && (hit === undefined || intersection.t < hit.t))
      hit = intersection
  })
  return hit
}

export class Sphere {
  transform: Transform = new Transform()

  intersect(ray: Ray): IIntersection[] {
    const transformedRay = this.transform.inverse().transformRay(ray)

    const a =
      transformedRay.direction.x ** 2 +
      transformedRay.direction.y ** 2 +
      transformedRay.direction.z ** 2
    const b =
      2 *
      (transformedRay.direction.x * transformedRay.origin.x +
        transformedRay.direction.y * transformedRay.origin.y +
        transformedRay.direction.z * transformedRay.origin.z)
    const c =
      transformedRay.origin.x ** 2 +
      transformedRay.origin.y ** 2 +
      transformedRay.origin.z ** 2 -
      1

    return quadratic(a, b, c).map(t => intersection(t, this))
  }
}

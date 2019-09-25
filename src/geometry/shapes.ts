import { Ray } from './ray'
import { quadratic } from './math'

export class Sphere {
  intersect(ray: Ray): number[] {
    const a = ray.direction.x ** 2 + ray.direction.y ** 2 + ray.direction.z ** 2
    const b =
      2 *
      (ray.direction.x * ray.origin.x +
        ray.direction.y * ray.origin.y +
        ray.direction.z * ray.origin.z)
    const c = ray.origin.x ** 2 + ray.origin.y ** 2 + ray.origin.z ** 2 - 1

    return quadratic(a, b, c)
  }
}

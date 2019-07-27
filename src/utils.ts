export function almostEquals(a: number, b: number) {
  return Math.abs(a - b) < 0.00001
}

export function clampNumber(number: number, min: number, max: number): number {
  return number < min ? min : number > max ? max : number
}

export function almostEquals(a: number, b: number): boolean {
  return Math.abs(a - b) < 0.00001
}

export function clampNumber(number: number, min: number, max: number): number {
  return number < min ? min : number > max ? max : number
}

export function swapArrayElements(array: Array<any>, a: number, b: number): void {
  [array[a], array[b]] = [array[b], array[a]]
}

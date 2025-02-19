export function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export function clamp(min: number, max: number, val: number) {
  return Math.min(Math.max(val, min), max);
}

export function isEven(number: number) {
  return number % 2 === 0;
}

export function linearMap(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  num: number
) {
  const val = y1 + ((num - x1) / (x2 - x1)) * (y2 - y1);

  return val;
}

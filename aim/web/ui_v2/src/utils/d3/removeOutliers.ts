export function removeOutliers(values: number[], t = 2): number[] {
  values.sort((a: number, b: number) => a - b);

  while (true) {
    if (!values.length) {
      break;
    }
    if (values[0] === values[values.length - 1]) {
      break;
    }
    const q1 = values[Math.floor(values.length / 4)];
    const q3 = values[Math.ceil(values.length * (3 / 4))];
    // Inter-quartile range
    const iqr = q3 - q1;
    const mean =
      values.reduce((pv: number, cv: number) => pv + cv, 0) / values.length;
    const furthest =
      mean - values[0] > values[values.length - 1] - mean
        ? values[0]
        : values[values.length - 1];
    if (Math.abs(furthest - mean) > t * iqr) {
      values = values.filter((elem: number) => elem !== furthest);
    } else {
      break;
    }
  }
  return values;
}
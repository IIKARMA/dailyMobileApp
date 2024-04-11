type FncType = (a: number, b: number) => number;

export function differencePercent<FncType>(a: number, b: number) {
  try {
    return Number((a / b - 1) * 100)?.toFixed(0);
  } catch (error) {}
}

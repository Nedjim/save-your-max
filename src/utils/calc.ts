export function estimateOneRepMax(weight: number, reps: number) {
  if (weight <= 0 || reps < 1) return null;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}

import { estimateOneRepMax } from './calc';

describe('estimateOneRepMax', () => {
  it('estimates the 1RM correctly', () => {
    expect(estimateOneRepMax(75, 15)).toBe(112.5);
  });

  it('rounds to one decimal place', () => {
    expect(estimateOneRepMax(80, 8)).toBe(101.3);
  });

  it('returns null for invalid weights', () => {
    expect(estimateOneRepMax(0, 10)).toBeNull();
    expect(estimateOneRepMax(-10, 10)).toBeNull();
  });

  it('returns null for invalid repetitions', () => {
    expect(estimateOneRepMax(75, 0)).toBeNull();
    expect(estimateOneRepMax(75, -1)).toBeNull();
  });
});

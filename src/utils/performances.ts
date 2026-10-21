import { Performance } from '../types';
import { estimateOneRepMax } from './calc';

type PerformanceWithEstimatedOneRM = Performance & {
  estimatedOneRM: number | null;
};

export const getBestPerformance = (performances: Performance[]) => {
  return performances.reduce((prev, curr) => {
    if (!prev || curr.weight > prev.weight) {
      return curr;
    }

    return prev;
  }, performances[0]);
};

export const performancesFormatter = (
  performances: Performance[],
): PerformanceWithEstimatedOneRM[] => {
  return performances.map((perf) => ({
    ...perf,
    estimatedOneRM:
      perf.reps > 1 ? estimateOneRepMax(perf.weight, perf.reps) : null,
  }));
};

export const getBestEstimatedPerformance = (
  performances: Performance[],
  oneRM: number,
) => {
  const formattedPerformances = performancesFormatter(performances);

  return formattedPerformances.reduce<PerformanceWithEstimatedOneRM | null>(
    (prev, curr) => {
      if (curr.estimatedOneRM === null || curr.estimatedOneRM < oneRM) {
        return prev;
      }

      if (!prev || curr.estimatedOneRM! > (prev.estimatedOneRM ?? -Infinity)) {
        return curr;
      }

      return prev;
    },
    null,
  );
};

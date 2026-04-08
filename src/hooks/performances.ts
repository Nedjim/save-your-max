import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPerformance,
  deletePerformance,
  getPerformances,
  updatePerformance,
} from '../services/performances';
import { CreatePerformancePayload, UpdatePerformancePayload } from '../types';

export function usePerformances(exerciseId: string) {
  const query = useQuery({
    queryKey: ['exercises', 'performances', exerciseId],
    queryFn: () => getPerformances(exerciseId),
  });

  return query;
}

export function useCreatePerformance() {
  return useMutation({
    mutationFn: (payload: CreatePerformancePayload & { exerciseId: string }) =>
      createPerformance(payload),
  });
}

export function useUpdatePerformance() {
  return useMutation({
    mutationFn: (payload: UpdatePerformancePayload) =>
      updatePerformance(payload),
  });
}

export function useDeletePerformance() {
  return useMutation({
    mutationFn: (performanceId: string) => deletePerformance(performanceId),
  });
}

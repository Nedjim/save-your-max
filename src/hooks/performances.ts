import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPerformance,
  deletePerformance,
  getPerformances,
  updatePerformance,
} from '../services/performances';
import { CreatePerformanceParams, UpdatePerformanceParams } from '../types';

export function usePerformances(exerciseId: string) {
  const query = useQuery({
    queryKey: ['exercises', 'performances', exerciseId],
    queryFn: () => getPerformances(exerciseId),
  });

  return query;
}

export function useCreatePerformance(exerciseId: string) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: CreatePerformanceParams) =>
      createPerformance(exerciseId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exercises', 'performances', exerciseId],
      });
    },
  });

  return query;
}

export function useUpdatePerformance(exerciseId: string) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: UpdatePerformanceParams) => updatePerformance(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exercises', 'performances', exerciseId],
      });
    },
  });

  return query;
}

export function useDeletePerformance(exerciseId: string) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (performanceId: string) => deletePerformance(performanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exercises', 'performances', exerciseId],
      });
    },
  });

  return query;
}

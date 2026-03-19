import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPerformance,
  deletePerformance,
  getPerformances,
  updatePerformance,
} from '../services/items';
import { CreateItemParams, UpdateItemParams } from '../types';

export function useItems(categoryId: string) {
  const query = useQuery({
    queryKey: ['category', 'items', categoryId],
    queryFn: () => getPerformances(categoryId),
  });

  return query;
}

export function useCreateItem(categoryId: string) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: CreateItemParams) =>
      createPerformance(categoryId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category', 'items', categoryId],
      });
    },
  });

  return query;
}

export function useUpdateItem(categoryId: string) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: UpdateItemParams) => updatePerformance(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category', 'items', categoryId],
      });
    },
  });

  return query;
}

export function useDeleteItem(categoryId: string) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (itemId: string) => deletePerformance(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category', 'items', categoryId],
      });
    },
  });

  return query;
}

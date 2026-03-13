import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from '../services/items';
import { CreateItemParams, UpdateItemParams } from '../types';

export function useItems(categoryId: string) {
  const query = useQuery({
    queryKey: ['category', 'items', categoryId],
    queryFn: () => getItems(categoryId),
  });

  return query;
}

export function useCreateItem(categoryId: string) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: CreateItemParams) => createItem(categoryId, params),
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
    mutationFn: (params: UpdateItemParams) => updateItem(params),
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
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category', 'items', categoryId],
      });
    },
  });

  return query;
}

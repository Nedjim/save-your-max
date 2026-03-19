import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import {
  createExercise,
  deleteExercise,
  getExercises,
} from '../services/categories';

export function useCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getExercises,
  });

  return query;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (title: string) => createExercise(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return query;
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (id: string) => deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return query;
}

export function useCategoryNameParams() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return name?.replace(/_+/g, ' ');
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import {
  createExercise,
  deleteExercise,
  getExercises,
} from '../services/exercises';

export function useExercises() {
  const query = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
  });

  return query;
}

export function useCreateExercise() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (title: string) => createExercise(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  return query;
}

export function useDeleteExercises() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (id: string) => deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  return query;
}

export function useExerciseNameParams() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return name?.replace(/_+/g, ' ');
}

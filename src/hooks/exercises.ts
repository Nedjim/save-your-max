import { useMutation, useQuery } from '@tanstack/react-query';
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
  return useMutation({
    mutationFn: (title: string) => createExercise(title),
  });
}

export function useDeleteExercises() {
  return useMutation({
    mutationFn: (id: string) => deleteExercise(id),
  });
}

export function useExerciseNameParams() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return name?.replace(/_+/g, ' ');
}

import { Exercise } from '../types';
import { apiFetch } from './supabase';

export async function getExercises() {
  return await apiFetch<Exercise[]>({ endpoint: 'exercises', method: 'GET' });
}

export const createExercise = (title: string) => {
  return apiFetch<Exercise, { title: string }>({
    endpoint: 'exercises',
    method: 'POST',
    body: { title },
  });
};

export const deleteExercise = async (id: string) => {
  return apiFetch<Exercise>({
    endpoint: `exercises/${id}`,
    method: 'DELETE',
  });
};

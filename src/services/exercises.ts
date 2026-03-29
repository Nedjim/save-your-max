import { Exercise } from '../types';
import { apiFetch } from './supabase';

export async function getExercises() {
  return await apiFetch<Exercise[]>({ endpoint: 'exercises', method: 'GET' });
}

export async function createExercise(title: string) {
  return await apiFetch<Exercise, { title: string }>({
    endpoint: 'exercises',
    method: 'POST',
    body: { title },
  });
}

export async function deleteExercise(id: string) {
  return await apiFetch<Exercise>({
    endpoint: `exercises/${id}`,
    method: 'DELETE',
  });
}

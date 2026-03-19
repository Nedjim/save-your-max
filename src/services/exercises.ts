import { ApiFetchType, Exercise } from '../types';
import { apiFetch } from './supabase';

export async function getExercises(): Promise<Exercise[]> {
  const payload: ApiFetchType = { endpoint: 'exercises' };

  return await apiFetch(payload);
}

export async function createExercise(title: string): Promise<Exercise> {
  const payload: ApiFetchType = {
    endpoint: 'exercises',
    method: 'POST',
    body: { title },
  };
  return await apiFetch(payload);
}

export async function deleteExercise(id: string): Promise<Exercise> {
  const payload: ApiFetchType = {
    endpoint: `exercises/${id}`,
    method: 'DELETE',
  };

  return await apiFetch(payload);
}

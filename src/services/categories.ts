import { ApiFetchType, Category } from '../types';
import { apiFetch } from './supabase';

export async function getExercises(): Promise<Category[]> {
  const payload: ApiFetchType = { endpoint: 'exercises' };

  return await apiFetch(payload);
}

export async function createExercise(title: string): Promise<Category> {
  const payload: ApiFetchType = {
    endpoint: 'exercises',
    method: 'POST',
    body: { title },
  };
  return await apiFetch(payload);
}

export async function deleteExercise(id: string): Promise<Category> {
  const payload: ApiFetchType = {
    endpoint: `exercises/${id}`,
    method: 'DELETE',
  };

  return await apiFetch(payload);
}

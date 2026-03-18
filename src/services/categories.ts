import { ApiFetchType, Category } from '../types';
import { apiFetch } from './supabase';

export async function getCategories(): Promise<Category[]> {
  const payload: ApiFetchType = { endpoint: 'categories' };

  return await apiFetch(payload);
}

export async function createCategory(title: string): Promise<Category> {
  const payload: ApiFetchType = {
    endpoint: 'categories',
    method: 'POST',
    body: { title },
  };
  return await apiFetch(payload);
}

export async function deleteCategory(id: string): Promise<Category> {
  const payload: ApiFetchType = {
    endpoint: `categories/${id}`,
    method: 'DELETE',
  };

  return await apiFetch(payload);
}

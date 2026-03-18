import {
  ApiFetchType,
  CreateItemParams,
  Item,
  UpdateItemParams,
} from '../types';
import { apiFetch } from './supabase';

export async function getItems(categoryId: string): Promise<Item[]> {
  const payload: ApiFetchType = { endpoint: `categories/${categoryId}/items` };

  return await apiFetch(payload);
}

export async function createItem(
  categoryId: string,
  params: CreateItemParams,
): Promise<Item> {
  const payload: ApiFetchType = {
    endpoint: `categories/${categoryId}/items`,
    method: 'POST',
    body: { ...params },
  };

  return await apiFetch(payload);
}

export async function updateItem(params: UpdateItemParams) {
  const { id, ...rest } = params;

  const payload: ApiFetchType = {
    endpoint: `items/${id}`,
    method: 'PATCH',
    body: {
      ...rest,
    },
  };

  return await apiFetch(payload);
}

export async function deleteItem(id: string) {
  const payload: ApiFetchType = { endpoint: `items/${id}`, method: 'DELETE' };

  return await apiFetch(payload);
}

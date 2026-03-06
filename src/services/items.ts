import { CreateItemPayload, Item, UpdateItemPayload } from '../types';

const BASE_URL = 'http://192.168.1.147:3000';
const OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getItems(categoryId: string): Promise<Item[]> {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}/items`);

  if (!response.ok) {
    return Promise.reject(
      new Error(`Error ${response.status}: ${response.statusText}`),
    );
  }

  return await response.json();
}

export async function createItem(
  categoryId: string,
  payload: CreateItemPayload,
): Promise<Item> {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}/items`, {
    ...OPTIONS,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return Promise.reject(
      new Error(`Error ${response.status}: ${response.statusText}`),
    );
  }

  return await response.json();
}

export async function updateItem(payload: UpdateItemPayload) {
  const { id, ...rest } = payload;

  const response = await fetch(`${BASE_URL}/items/${id}`, {
    ...OPTIONS,
    method: 'PATCH',
    body: JSON.stringify({
      ...rest,
    }),
  });

  if (!response.ok) {
    return Promise.reject(
      new Error(`Error ${response.status}: ${response.statusText}`),
    );
  }

  return await response.json();
}

export async function deleteItem(itemId: string) {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    ...OPTIONS,
    method: 'DELETE',
  });

  if (!response.ok) {
    return Promise.reject(
      new Error(`Error ${response.status}: ${response.statusText}`),
    );
  }

  return await response.json();
}

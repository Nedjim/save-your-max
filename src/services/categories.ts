import { Category } from '../types';

const BASE_URL = 'http://192.168.1.147:3000';
const OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    return Promise.reject(
      new Error(`Error ${response.status}: ${response.statusText}`),
    );
  }

  return await response.json();
}

export async function createCategory(title: string): Promise<Category> {
  const response = await fetch(`${BASE_URL}/categories`, {
    ...OPTIONS,
    method: 'POST',
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    return Promise.reject(
      new Error(`Error ${response.status}: ${response.statusText}`),
    );
  }

  return await response.json();
}

export async function deleteCategory(id: string): Promise<Category> {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
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

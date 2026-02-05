import { Category } from '../types';

const BASE_URL = 'http://127.0.0.1:3000';
const OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('getCategories error:', error);

    throw error;
  }
}

export async function createCategory(title: string): Promise<Category> {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      ...OPTIONS,
      method: 'POST',
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('createCategory error:', error);

    throw error;
  }
}

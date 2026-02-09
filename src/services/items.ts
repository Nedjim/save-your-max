import { CreateItemPayload, DeleteItemPayload, Item } from '../types';

const BASE_URL = 'http://192.168.1.147:3000';
const OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getItems(categoryId: string): Promise<Item[]> {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/items`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('getItems error:', error);

    throw error;
  }
}

export async function createItem(
  categoryId: string,
  payload: CreateItemPayload,
): Promise<Item> {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/items`, {
      ...OPTIONS,
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('createItem error:', error);

    throw error;
  }
}

export async function deleteItem(payload: DeleteItemPayload) {
  const { categoryId, itemId } = payload;

  try {
    const response = await fetch(
      `${BASE_URL}/categories/${categoryId}/items/${itemId}`,
      {
        ...OPTIONS,
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('delete Item error: ', error);
    throw error;
  }
}

import { CreateItemPayload, Item, UpdateItemPayload } from '../types';




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
    console.error('Create item error:', error);

    throw error;
  }
}

export async function updateItem(payload: UpdateItemPayload) {
  const { id, ...rest } = payload;

  try {
    const response = await fetch(`${BASE_URL}/items/${id}`, {
      ...OPTIONS,
      method: 'PATCH',
      body: JSON.stringify({
        ...rest,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Update item error: ', error);
    throw error;
  }
}

export async function deleteItem(itemId: string) {
  try {
    const response = await fetch(`${BASE_URL}/items/${itemId}`, {
      ...OPTIONS,
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Delete item error: ', error);
    throw error;
  }
}

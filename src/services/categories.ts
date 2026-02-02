const BASE_URL = 'http://127.0.0.1:3000';

export async function getCategories() {
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

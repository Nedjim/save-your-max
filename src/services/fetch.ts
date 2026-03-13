import { supabase } from './supabase';

export type ApiFetchType = {
  endpoint: string;
  body?: any;
  options?: any;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
};

export const apiFetch = async (payload: ApiFetchType) => {
  const { endpoint, options, method = 'GET' } = payload;

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    throw new Error('No access token available');
  }

  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/${endpoint}`,
    {
      ...options,
      method,
      body: JSON.stringify(payload.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 401) {
    await supabase.auth.signOut();
  }

  return res.json();
};

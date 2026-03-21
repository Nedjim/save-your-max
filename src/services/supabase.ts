import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'expo-sqlite/localStorage/install';
import { ApiFetchType, SupabasePayload } from '../types';
import { getProfile } from './profiles';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const webStorage =
  typeof window !== 'undefined'
    ? {
        getItem: (key: string) =>
          Promise.resolve(window.localStorage.getItem(key)),
        setItem: (key: string, value: string) =>
          Promise.resolve(window.localStorage.setItem(key, value)),
        removeItem: (key: string) =>
          Promise.resolve(window.localStorage.removeItem(key)),
      }
    : undefined;

const storage = Platform.OS === 'web' ? webStorage : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

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

export const getToken = async () => {
  const session = await supabase.auth.getSession();

  return session.data.session?.access_token;
};

export const signInUser = async (supabasePayload: SupabasePayload) => {
  const session = await supabase.auth.signInWithPassword(supabasePayload);
  const { error } = session;

  if (error) {
    throw new Error(error.message);
  }

  try {
    await getProfile();
    return session;
  } catch {
    await supabase.auth.signOut();
    throw new Error('No profile found');
  }
};

export const signOutUser = async () => {
  return await supabase.auth.signOut();
};

export const getUserSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      await supabase.auth.signOut();
      return null;
    }

    return data.session;
  } catch {
    await supabase.auth.signOut();
    return null;
  }
};

export const createUser = async (user: SupabasePayload) => {
  const { error } = await supabase.auth.signUp(user);

  if (error) {
    throw new Error(error.message);
  }

  try {
    const payload: ApiFetchType = {
      endpoint: 'profiles',
      method: 'POST',
    };

    return await apiFetch(payload);
  } catch {
    await supabase.auth.signOut();
    return null;
  }
};

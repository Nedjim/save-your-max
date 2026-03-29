import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import 'expo-sqlite/localStorage/install';
import { ApiFetchPayload, SupabasePayload } from '../types';
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

export async function apiFetch<TResponse, TBody = unknown>(
  payload: ApiFetchPayload<TBody>,
): Promise<TResponse> {
  const { endpoint, method } = payload;
  const userSession = await getUserSession();
  const token = userSession?.access_token;

  if (!token) {
    throw new Error('No access token available');
  }

  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/${endpoint}`,
    {
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
}

export const getToken = async () => {
  const userSession = await getUserSession();

  return userSession?.access_token;
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
    return await apiFetch({
      endpoint: 'profiles',
      method: 'POST',
    });
  } catch {
    await supabase.auth.signOut();
    return null;
  }
};

const resetPasswordUrl = Linking.createURL('reset-password');

export const resetPasswordEmail = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: resetPasswordUrl,
  });
};

export const resetPassword = async (
  token: string,
  refreshToken: string,
  password: string,
) => {
  const { error: sessionError } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refreshToken,
  });

  if (sessionError) {
    throw sessionError;
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw error;
  }

  await supabase.auth.signOut();
};

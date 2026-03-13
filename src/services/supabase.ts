import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'expo-sqlite/localStorage/install';
import { UserPayload } from '../types';

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

export const getToken = async () => {
  const session = await supabase.auth.getSession();

  return session.data.session?.access_token;
};

export const signInUser = async (payload: UserPayload) => {
  return await supabase.auth.signInWithPassword(payload);
};

export const signupUser = (payload: UserPayload) => {
  return supabase.auth.signUp(payload).then(async () => {
    return await createProfile();
  });
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

export const createProfile = async () => {
  const session = await supabase.auth.getSession();

  if (session.data.session) {
    await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/profiles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.data.session.access_token}`,
      },
    });
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { toast } from 'sonner-native';
import 'expo-sqlite/localStorage/install';
import {
  ApiError,
  ApiFetchPayload,
  SupabasePayload,
  UpdateUserPayload,
} from '../types';
import { createProfile, getProfile } from './profiles';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const webStorage =
  typeof window !== 'undefined'
    ? {
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        removeItem: SecureStore.deleteItemAsync,
      }
    : undefined;

const storage = Platform.OS === 'web' ? webStorage : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage,
    flowType: 'pkce',
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

  if (!res.ok) {
    const errorData = await res.json();

    const error: ApiError = {
      message: errorData?.message || 'Something went wrong!',
      statusCode: errorData?.statusCode || res.status,
      code: errorData?.code,
    };

    throw error;
  }

  return res.json();
}

export const getToken = async () => {
  const userSession = await getUserSession();

  return userSession?.access_token;
};

export const signInUser = async (supabasePayload: SupabasePayload) => {
  const { data, error } =
    await supabase.auth.signInWithPassword(supabasePayload);

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session) {
    throw new Error('No session');
  }

  try {
    await getProfile();
    return data;
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

export const signupUser = async (user: SupabasePayload) => {
  const signupUrl = 'saveyourmax://signup-confirm';

  const { data, error: sessionError } = await supabase.auth.signUp({
    ...user,
    options: {
      emailRedirectTo: signupUrl,
    },
  });

  if (sessionError) {
    throw sessionError;
  }

  return data;
};

export const signupConfirmUser = async (code: string) => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('No user returned after signup confirmation');
  }

  try {
    const profile = await createProfile();

    toast.success('Votre compte a été créé avec succès');

    return profile;
  } catch (error) {
    await signOutUser();

    toast.error('Oups ! La création de votre profil a échoué.');

    throw error;
  }
};

export const resetPasswordEmail = async (email: string) => {
  const resetPasswordUrl = 'saveyourmax://reset-password';

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

export const updateUser = async (payload: UpdateUserPayload) => {
  const resetEmailURL = 'saveyourmax://reset-email';

  const { data, error } = await supabase.auth.updateUser(payload, {
    emailRedirectTo: resetEmailURL,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const deleteUser = async (userId: string) => {
  const { data, error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
  return data;
};

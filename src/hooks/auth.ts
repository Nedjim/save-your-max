'use no memo';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useGlobalSearchParams } from 'expo-router';
import {
  getUserSession,
  signInUser,
  signOutUser,
  signupConfirmUser,
  signupUser,
  supabase,
  updateUser,
} from '../services/supabase';
import { AuthSearchParams, SupabasePayload, UpdateUserPayload } from '../types';

const RESET_PASSWORD_URL_PARAMS = ['access_token', 'refresh_token', 'type'];

export const useSupabaseSession = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['session'],
    queryFn: getUserSession,
    staleTime: Infinity,
  });

  const resetSession = async () => {
    await supabase.auth.signOut();
    queryClient.setQueryData(['session'], null);
    queryClient.invalidateQueries({ queryKey: ['session'] });
    queryClient.removeQueries({ queryKey: ['session'] });
  };

  return { ...query, resetSession };
};

export function useSignInUser() {
  return useMutation({
    mutationFn: (payload: SupabasePayload) => signInUser(payload),
  });
}

export function useSignupUser() {
  return useMutation({
    mutationFn: (payload: SupabasePayload) => signupUser(payload),
  });
}

export function useSignupConfirmUser(token: string, refreshToken: string) {
  const query = useQuery({
    queryKey: ['signup', 'confirm', token, refreshToken],
    queryFn: () => signupConfirmUser(token, refreshToken),
  });

  return query;
}

export function useSignOutUser() {
  return useMutation({
    mutationFn: () => signOutUser(),
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
  });
}

export function useAuthSearchParams(): AuthSearchParams {
  const params = useGlobalSearchParams<Record<string, string>>();

  if (params['#']) {
    const hash = params['#'].split('&');

    return hash
      .filter((param) => {
        const [key] = param.split('=');

        return RESET_PASSWORD_URL_PARAMS.includes(key);
      })
      .reduce((prev, curr) => {
        const [key, value] = curr.split('=');

        return { ...prev, [key]: value };
      }, {});
  }

  return {};
}

'use no memo';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useGlobalSearchParams } from 'expo-router';
import {
  getUserSession,
  signInUser,
  signOutUser,
  signupConfirmUser,
  signupUser,
  updateUser,
} from '../services/supabase';
import { AuthSearchParams, SupabasePayload, UpdateUserPayload } from '../types';

const RESET_PASSWORD_URL_PARAMS = ['access_token', 'refresh_token', 'type'];

export const useSupabaseSession = () => {
  const query = useQuery({
    queryKey: ['session'],
    queryFn: getUserSession,
    staleTime: Infinity,
  });

  return query;
};

export function useSignInUser() {
  return useMutation({
    mutationFn: signInUser,
  });
}

export function useSignupUser() {
  const query = useMutation({
    mutationFn: (payload: SupabasePayload) => signupUser(payload),
  });

  return query;
}

export function useSignupConfirmUser(token: string, refreshToken: string) {
  const query = useQuery({
    queryKey: ['signup', 'confirm', token, refreshToken],
    queryFn: () => signupConfirmUser(token, refreshToken),
  });

  return query;
}

export function useSignOutUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => signOutUser(),
    onSuccess: () => {
      queryClient.setQueryData(['session'], null);
    },
  });

  return query;
}

export function useUpdateUser() {
  const query = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
  });

  return query;
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

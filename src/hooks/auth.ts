'use no memo';

import { AuthTokenResponsePassword } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  getUserSession,
  signInUser,
  signOutUser,
} from '../services/supabase';
import { SupabasePayload } from '../types';

export const useSupabaseSession = () => {
  const query = useQuery({
    queryKey: ['session'],
    queryFn: getUserSession,
    staleTime: Infinity,
  });

  return query;
};

export function useSignInUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (payload: SupabasePayload) => signInUser(payload),
    onSuccess: (res: AuthTokenResponsePassword) => {
      queryClient.setQueryData(['session'], res.data.session);
    },
  });

  return query;
}

export function useCreateUser() {
  const query = useMutation({
    mutationFn: (payload: SupabasePayload) => createUser(payload),
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

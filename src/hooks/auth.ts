'use no memo';

import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  getUserSession,
  signInUser,
  signOutUser,
} from '../services/supabase';
import { UserPayload } from '../types';

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
    mutationFn: (payload: UserPayload) => signInUser(payload),
    onSuccess: (res: AuthTokenResponsePassword) => {
      queryClient.setQueryData(['session'], res.data.session);
    },
  });

  return query;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (payload: UserPayload) => createUser(payload),
    onSuccess: (res: AuthResponse | null) => {
      res && queryClient.setQueryData(['session'], res.data.session);
    },
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

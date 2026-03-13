import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getUserSession,
  signInUser,
  signOutUser,
  signupUser,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  return query;
}

export function useSignUpUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (payload: UserPayload) => signupUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  return query;
}

export function useSignOutUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => signOutUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  return query;
}

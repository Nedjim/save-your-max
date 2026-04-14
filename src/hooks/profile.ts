import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteProfile, getProfile, updateProfile } from '../services/profiles';
import { UpdateProfileFormValues } from '../types';

export function useProfile() {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return query;
}

export function useDeleteProfile() {
  return useMutation({
    mutationFn: () => deleteProfile(),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (payload: UpdateProfileFormValues) => updateProfile(payload),
  });
}

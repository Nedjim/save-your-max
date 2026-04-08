import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteProfile, getProfile } from '../services/profiles';

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

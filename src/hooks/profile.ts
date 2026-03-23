import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProfile, getProfile } from '../services/profiles';

export function useProfile() {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return query;
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => deleteProfile(),
    onSuccess: () => {
      queryClient.setQueryData(['session'], null);
    },
  });

  return query;
}

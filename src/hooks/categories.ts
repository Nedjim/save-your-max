import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, getCategories } from '../services/categories';

export function useCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return query;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (title: string) => createCategory(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return query;
}

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categories';
import { Category } from '../types';

export function useCategories() {
  const query = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return query;
}

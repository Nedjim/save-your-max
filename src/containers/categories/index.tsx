import { ActivityIndicator } from 'react-native';
import { useCategories } from '../../hooks/categories';
import Error from '@/src/components/Error';
import { WHITE } from '@/src/constants/colors';
import EmptyState from './CategoriesEmptyState';
import CategoryList from './CategoryList';

export default function Categories() {
  const { data: categories = [], isLoading, isError, error } = useCategories();

  let content = null;

  if (isLoading) {
    content = <ActivityIndicator size="large" color={WHITE} />;
  }

  if (isError) {
    content = <Error message={error.message} />;
  }

  if (categories.length === 0) {
    content = <EmptyState />;
  }

  return content ? content : <CategoryList categories={categories} />;
}

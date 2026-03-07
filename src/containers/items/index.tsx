import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import Error from '@/src/components/Error';
import { WHITE } from '@/src/constants/colors';
import { useItems } from '@/src/hooks/items';
import ItemList from './ItemList';
import EmptyState from './ItemsEmptyState';

export default function Items() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: items = [], isLoading, isError, error } = useItems(id);

  let content = null;

  if (isLoading) {
    content = <ActivityIndicator size="large" color={WHITE} />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !items.length) {
    content = <EmptyState />;
  }

  return content ? content : <ItemList items={items} />;
}

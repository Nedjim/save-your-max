import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import Error from '@/src/components/Error';
import { WHITE } from '@/src/constants/colors';
import { usePerformances } from '@/src/hooks/performances';
import PerformanceList from './PerformanceList';
import EmptyState from './PerformancesEmptyState';

function Performances() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data = [], isLoading, isError, error } = usePerformances(id);

  let content = null;

  if (isLoading) {
    content = <ActivityIndicator size="large" color={WHITE} />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !data.length) {
    content = <EmptyState />;
  }

  return content ? content : <PerformanceList performances={data} />;
}

export default Performances;

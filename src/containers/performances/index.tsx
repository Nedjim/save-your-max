import Error from '@/src/components/Error';
import Loader from '@/src/components/Loader';
import { usePerformances } from '@/src/hooks/performances';
import { useLocalSearchParams } from 'expo-router';
import PerformanceList from './PerformanceList';
import EmptyState from './PerformancesEmptyState';

function Performances() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data = [], isLoading, isError, error, refetch } = usePerformances(id);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !data.length) {
    content = <EmptyState refetch={refetch} />;
  }

  return content ? (
    content
  ) : (
    <PerformanceList performances={data} refetch={refetch} />
  );
}

export default Performances;

import { useLocalSearchParams } from 'expo-router';
import Error from '@/src/components/Error';
import Loader from '@/src/components/Loader';
import { usePerformances } from '@/src/hooks/performances';
import PerformanceList from './PerformanceList';
import EmptyState from './PerformancesEmptyState';
import PersonalRecord from './PersonalRecord';

function Performances() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: dataPerformances,
    isLoading,
    isError,
    error,
    refetch,
  } = usePerformances(id);

  const { data: performances = [], total = 0 } = dataPerformances ?? {};

  let content = null;

  if (isLoading) {
    content = <Loader />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !total) {
    content = <EmptyState refetch={refetch} />;
  }

  return content ? (
    content
  ) : (
    <>
      {total > 0 && <PersonalRecord performances={performances} />}
      <PerformanceList
        performances={performances}
        refetch={refetch}
        total={total}
      />
    </>
  );
}

export default Performances;

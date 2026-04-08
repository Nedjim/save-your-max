import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CreatePerformanceModal from './Modals/CreateModal';
import DeletePerformanceModal from './Modals/DeleteModal';
import UpdatePerformanceModal from './Modals/UpdateModal';
import AddMoreButton from '@/src/components/Buttons/AddMoreButton';
import { Performance } from '@/src/types';
import PerformanceRow from './PerformanceRow';

type PerformanceListProps = {
  performances: Performance[];
  refetch: () => void;
};

const PerformanceList = (props: PerformanceListProps) => {
  const { performances, refetch } = props;
  const [createPerformance, setCreatePerformance] = useState(false);
  const [deletePerformanceId, setDeletePerformanceId] = useState<string | null>(
    null,
  );
  const [updatedPerformance, setUpdatePerformance] =
    useState<Performance | null>(null);

  const onCreate = () => {
    setCreatePerformance(true);
  };

  const onUpdate = (performance: Performance) => {
    setUpdatePerformance(performance);
  };

  const onDelete = (id: string) => {
    setDeletePerformanceId(id);
  };

  return (
    <View style={styles.performanceContent}>
      <FlatList
        data={performances}
        style={styles.performanceList}
        renderItem={({ item }) => {
          return (
            <PerformanceRow
              performance={item}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        }}
        keyExtractor={(performance) => performance.id}
      />
      <View style={styles.actions}>
        <AddMoreButton
          onPress={onCreate}
          accessibilityLabel="Add performance"
        />
      </View>

      {updatedPerformance && (
        <UpdatePerformanceModal
          performance={updatedPerformance}
          onClose={() => {
            setUpdatePerformance(null);
          }}
          refetch={refetch}
        />
      )}

      {createPerformance && (
        <CreatePerformanceModal
          refetch={refetch}
          onClose={() => {
            setCreatePerformance(false);
          }}
        />
      )}
      {deletePerformanceId && (
        <DeletePerformanceModal
          id={deletePerformanceId}
          refetch={refetch}
          closeModal={() => {
            setDeletePerformanceId(null);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  performanceContent: {
    flex: 1,
  },
  performanceList: {
    flex: 1,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 24,
    paddingTop: 32,
  },
});

export default PerformanceList;

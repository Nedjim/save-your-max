import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Alert from '@/src/components/Alert';
import AddMoreButton from '@/src/components/Buttons/AddMoreButton';
import { useDeletePerformance } from '@/src/hooks/performances';
import { Performance } from '@/src/types';
import PerformanceModal from './PerformanceModal';
import PerformanceRow from './PerformanceRow';

type PerformanceListProps = {
  performances: Performance[];
};

const PerformanceList = (props: PerformanceListProps) => {
  const { performances } = props;
  const { id: exerciseId } = useLocalSearchParams<{ id: string }>();
  const { mutate: deletePerformanceMutation } =
    useDeletePerformance(exerciseId);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [updatedPerformance, setUpdatedPerformance] =
    useState<Performance | null>(null);

  const onCreate = () => {
    setShowModal(true);
  };

  const onUpdate = (performance: Performance) => {
    setUpdatedPerformance(performance);
    setShowModal(true);
  };

  const onDelete = (performance: Performance) => {
    setUpdatedPerformance(performance);
    setShowAlert(true);
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
      {showModal && (
        <PerformanceModal
          performance={updatedPerformance}
          onClose={() => {
            setShowModal(false);
            updatedPerformance && setUpdatedPerformance(null);
          }}
        />
      )}
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
            updatedPerformance && setUpdatedPerformance(null);
          }}
          description="This performance is about to be deleted."
          onSubmit={() => {
            updatedPerformance &&
              deletePerformanceMutation(updatedPerformance.id, {
                onSuccess: () => {
                  setShowAlert(false);
                },
              });
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

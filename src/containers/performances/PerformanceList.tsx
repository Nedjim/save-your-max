import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CreatePerformanceModal from './Modals/CreateModal';
import DeletePerformanceModal from './Modals/DeleteModal';
import UpdatePerformanceModal from './Modals/UpdateModal';
import AddMoreButton from '@/src/components/Buttons/AddMoreButton';
import { TURQUOISE, WHITE } from '@/src/constants/colors';
import { Performance } from '@/src/types';
import PerformanceRow from './PerformanceRow';

type PerformanceListProps = {
  performances: Performance[];
  refetch: () => void;
};

const PerformanceList = (props: PerformanceListProps) => {
  const { performances, refetch } = props;

  const { t } = useTranslation();
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
      <View style={styles.performanceHeader}>
        <Ionicons name="bar-chart-outline" size={24} color={TURQUOISE} />
        <Text style={styles.performanceHeaderTitle}>
          {t('performance.historyTitle')}
        </Text>
      </View>
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
  performanceHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 16,
    marginHorizontal: 8,
  },
  performanceHeaderTitle: {
    color: WHITE,
    fontSize: 16,
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

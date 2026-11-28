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
  total: number;
};

const PerformanceList = (props: PerformanceListProps) => {
  const { performances, refetch, total } = props;

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
      <View style={styles.historyBanner}>
        <View style={styles.historyBannerContent}>
          <Ionicons name="bar-chart-outline" size={24} color={TURQUOISE} />
          <Text style={styles.historyBannerTitle}>
            {t('performance.historyBannerTitle')}
          </Text>
        </View>
        <Text style={styles.historyBannerCount}>
          {t('performance.historyBannerResult', { count: total })}
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
  historyBanner: {
    display: 'flex',
    marginVertical: 24,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyBannerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  historyBannerTitle: {
    color: WHITE,
  },
  historyBannerCount: {
    color: '#86a7a7',
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

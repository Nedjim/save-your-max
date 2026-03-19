import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import EmptyState from '@/src/components/EmptyState';
import PerformanceModal from './PerformanceModal';

function PerformancesEmptyState() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.emptyPerformances}
    >
      <EmptyState
        description="You don’t have any performances yet. Create your first one to get started."
        buttonTitle="Create"
        onPressButton={() => {
          setShowModal(true);
        }}
      />
      {showModal && <PerformanceModal onClose={() => setShowModal(false)} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  emptyPerformances: {
    flex: 1,
    display: 'flex',
    marginTop: 40,
  },
});

export default PerformancesEmptyState;

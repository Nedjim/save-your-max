import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import EmptyState from '@/src/components/EmptyState';
import ItemModal from './ItemModal';

export default function ItemsEmptyState() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.emptyItems}
    >
      <EmptyState
        description="You don’t have any items yet. Create your first one to get started."
        buttonTitle="Create"
        onPressButton={() => {
          setShowModal(true);
        }}
      />
      {showModal && <ItemModal onClose={() => setShowModal(false)} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  emptyItems: {
    flex: 1,
    display: 'flex',
    marginTop: 40,
  },
});

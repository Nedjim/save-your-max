import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EmptyState from '@/src/components/EmptyState';
import ItemModal from './ItemModal';

export default function ItemsEmptyState() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.emptyItems}>
      <EmptyState
        description="You don’t have any items yet. Create your first one to get started."
        buttonTitle="Create"
        onPressButton={() => {
          setShowModal(true);
        }}
      />
      {showModal && <ItemModal onClose={() => setShowModal(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyItems: {
    flex: 1,
    display: 'flex',
    marginTop: 40,
  },
});

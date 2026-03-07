import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EmptyState from '@/src/components/EmptyState';
import CategoryModal from './CategoryModal';

export default function CategoriesEmptyState() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.emptyCategories}>
      <EmptyState
        description="You don’t have any categories yet. Create your first one to get started."
        buttonTitle="New category"
        onPressButton={() => {
          setModalVisible(true);
        }}
      />
      <CategoryModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCategories: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});

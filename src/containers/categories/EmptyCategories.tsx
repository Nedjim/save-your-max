import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EmptyState from '@/src/components/EmptyState';
import AddCategoryModal from './AddCategoryModal';

const EmptyCategories = () => {
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
      <AddCategoryModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCategories: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default memo(EmptyCategories);

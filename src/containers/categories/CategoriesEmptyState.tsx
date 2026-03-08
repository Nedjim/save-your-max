import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import EmptyState from '@/src/components/EmptyState';
import CategoryModal from './CategoryModal';

export default function CategoriesEmptyState() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.emptyCategories}
    >
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  emptyCategories: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});

import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import EmptyState from '@/src/components/EmptyState';
import ExerciseModal from './ExerciseModal';

function ExercisesEmptyState() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.emptyExercises}
    >
      <EmptyState
        description="You don’t have any exercises yet. Create your first one to get started."
        buttonTitle="New exercise"
        onPressButton={() => {
          setModalVisible(true);
        }}
      />
      <ExerciseModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  emptyExercises: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default ExercisesEmptyState;

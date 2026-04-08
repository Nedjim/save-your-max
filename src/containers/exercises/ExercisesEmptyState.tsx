import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import CreateExerciseModal from './Modals/CreateModal';
import EmptyState from '@/src/components/EmptyState';
import { useExercises } from '@/src/hooks/exercises';

function ExercisesEmptyState() {
  const { refetch } = useExercises();
  const [createExercise, setCreateExercise] = useState(false);

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
          setCreateExercise(true);
        }}
      />
      {createExercise && (
        <CreateExerciseModal
          refetch={refetch}
          closeModal={() => setCreateExercise(false)}
        />
      )}
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

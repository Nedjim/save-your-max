import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CreateExerciseModal from './Modals/CreateModal';
import DeleteExerciseModal from './Modals/DeleteModal';
import AddMoreButton from '@/src/components/Buttons/AddMoreButton';
import { useExercises } from '@/src/hooks/exercises';
import { Exercise } from '@/src/types';
import ExerciseRow from './ExerciseRow';

type ExerciseListProps = {
  exercises: Exercise[];
};

function ExerciseList(props: ExerciseListProps) {
  const { exercises } = props;
  const router = useRouter();
  const { refetch } = useExercises();
  const { exerciseId } = useLocalSearchParams();

  const [createExercise, setCreateExercise] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  return (
    <View style={styles.list}>
      <FlatList
        data={exercises}
        keyExtractor={(exercise) => exercise.id}
        renderItem={({ item: exercise }) => {
          const { id, title } = exercise;
          const name = encodeURIComponent(title.replace(/\s+/g, '_'));

          return (
            <ExerciseRow
              title={title}
              id={id}
              onDelete={() => setDeletedId(id)}
              onPress={() => {
                router.push({
                  pathname: '/exercises/[id]',
                  params: { id, name },
                });
              }}
            />
          );
        }}
        extraData={exerciseId}
      />
      <View style={styles.actions}>
        <AddMoreButton
          onPress={() => setCreateExercise(true)}
          accessibilityLabel="Add exercise"
        />
      </View>
      {createExercise && (
        <CreateExerciseModal
          refetch={refetch}
          closeModal={() => setCreateExercise(false)}
        />
      )}
      {deletedId && (
        <DeleteExerciseModal
          id={deletedId}
          refetch={refetch}
          closeModal={() => setDeletedId(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
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

export default ExerciseList;

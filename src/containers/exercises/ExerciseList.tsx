import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AddMoreButton from '@/src/components/Buttons/AddMoreButton';
import { useDeleteExercises } from '@/src/hooks/exercises';
import { Exercise } from '@/src/types';
import ExerciseModal from './ExerciseModal';
import ExerciseRow from './ExerciseRow';

type ExerciseListProps = {
  exercises: Exercise[];
};

function ExerciseList(props: ExerciseListProps) {
  const { exercises } = props;
  const { exerciseId } = useLocalSearchParams();
  const { mutate: deleteExerciseMutation } = useDeleteExercises();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    deleteExerciseMutation(id);
  };

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
              onDelete={handleDelete}
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
        <AddMoreButton onPress={openModal} accessibilityLabel="Add exercise" />
      </View>
      <ExerciseModal visible={modalVisible} closeModal={closeModal} />
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

import { StyleSheet, Text } from 'react-native';
import { LIGHT_GREY } from '../constants/colors';
import Performances from '../containers/performances';
import { useExerciseNameParams } from '../hooks/exercises';

export default function ExercisePage() {
  const name = useExerciseNameParams();

  return (
    <>
      <Text style={styles.title}>{name}</Text>
      <Performances />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: LIGHT_GREY,
    fontSize: 20,
    marginBottom: 16,
  },
});

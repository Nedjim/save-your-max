import { StyleSheet, Text } from 'react-native';
import { LIGHT_GREY } from '../constants/colors';
import PageWrapper from '../containers/page/PageWrapper';
import Performances from '../containers/performances';
import { useExerciseNameParams } from '../hooks/exercises';

export default function ExercisePage() {
  const exerciseName = useExerciseNameParams();

  return (
    <PageWrapper>
      <Text style={styles.title}>{exerciseName}</Text>
      <Performances />
    </PageWrapper>
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

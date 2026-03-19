import { ActivityIndicator } from 'react-native';
import { useExercises } from '../../hooks/exercises';
import Error from '@/src/components/Error';
import { WHITE } from '@/src/constants/colors';
import ExerciseList from './ExerciseList';
import EmptyState from './ExercisesEmptyState';

function Exercises() {
  const { data: exercises = [], isLoading, isError, error } = useExercises();

  let content = null;

  if (isLoading) {
    content = <ActivityIndicator size="large" color={WHITE} />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !exercises.length) {
    content = <EmptyState />;
  }

  return content ? content : <ExerciseList exercises={exercises} />;
}

export default Exercises;

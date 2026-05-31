import Error from '@/src/components/Error';
import Loader from '@/src/components/Loader';
import { useExercises } from '../../hooks/exercises';
import ExerciseList from './ExerciseList';
import EmptyState from './ExercisesEmptyState';

function Exercises() {
  const { data: exercises = [], isLoading, isError, error } = useExercises();

  let content = null;

  if (isLoading) {
    content = <Loader />;
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

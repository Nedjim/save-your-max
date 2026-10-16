import { Stack, useLocalSearchParams } from 'expo-router';
import ExercisePage from '@/src/pages/ExercisePage';

export default function Exercise() {
  const { title } = useLocalSearchParams<{
    title?: string;
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: title ?? '',
        }}
      />
      <ExercisePage />
    </>
  );
}

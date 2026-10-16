import { Stack } from 'expo-router';
import {
  CHILD_SCREEN_OPTIONS,
  DEFAULT_SCREEN_OPTIONS,
} from '@/src/constants/screen';

export const unstable_settings = {
  anchor: 'index',
};

export default function ExercisesLayout() {
  return (
    <Stack
      screenOptions={{
        ...DEFAULT_SCREEN_OPTIONS,
        headerBackVisible: false,
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen name="[id]" options={CHILD_SCREEN_OPTIONS} />
    </Stack>
  );
}

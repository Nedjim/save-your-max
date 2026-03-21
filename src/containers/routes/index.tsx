import { Redirect, Stack, useSegments } from 'expo-router';
import { useSession } from '@/src/context/AuthContext';
import { getDevice } from '@/src/utils';
import SCREEN_OPTIONS from './screenOptions';

const device = getDevice();

const screenOptionsByDevice = SCREEN_OPTIONS[device];

function RootNavigator() {
  const { session, isLoading } = useSession();
  const segments = useSegments();

  if (isLoading) {
    return null;
  }

  const inAuthGroup = segments[0] === '(auth)';

  if (!session && !inAuthGroup) {
    return <Redirect href="/login" />;
  }
  if (session && inAuthGroup) {
    return <Redirect href="/exercises" />;
  }

  return (
    <Stack screenOptions={screenOptionsByDevice}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default RootNavigator;

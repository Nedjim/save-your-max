import { Redirect, Stack, useSegments } from 'expo-router';
import { Platform } from 'react-native';
import { useSupabaseSession } from '@/src/hooks/auth';
import { Device } from '@/src/types';
import SCREEN_OPTIONS from './screenOptions';

export const getDevice = () => {
  switch (Platform.OS) {
    case 'ios':
      return Device.IOS;
    case 'android':
      return Device.Android;
    default:
      return Device.Web;
  }
};

const screenOptionsByDevice = SCREEN_OPTIONS[getDevice()];

function RootNavigator() {
  const { data: session, isLoading } = useSupabaseSession();
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

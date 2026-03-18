import { HeaderTitle } from '@react-navigation/elements';
import { Redirect, Stack, useSegments } from 'expo-router';
import BackButton from '@/src/components/BackButton';
import LogoutButton from '@/src/components/LogoutButton';
import { useSession } from '@/src/context/AuthContext';
import { Device } from '@/src/types';
import { getDevice } from '@/src/utils';

const device = getDevice();

// Type any because NativeStackNavigationOptions type is deprecated in Expo Router
const SCREEN_OPTIONS: Record<Device, any> = {
  ios: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitle: () => <HeaderTitle />,
    headerRight: () => <LogoutButton />,
  },
  android: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitle: () => <HeaderTitle />,
    headerRight: () => <LogoutButton />,
  },
  web: {
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerTitle: () => <HeaderTitle />,
    headerLeft: () => <BackButton />,
    headerRight: () => <LogoutButton />,
  },
};

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

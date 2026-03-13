import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import 'react-native-gesture-handler';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { fr, registerTranslation } from 'react-native-paper-dates';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import HeaderTitle from '../components/HeaderTitle';
import UserInfo from '../components/UserInfo';
import { TURQUOISE } from '../constants/colors';
import SupabaseOnAuthStateChange from '../containers/supabase/SupabaseOnAuthStateChange';
import { Device } from '../types';
import { getDevice } from '../utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: TURQUOISE,
  },
};

registerTranslation('fr', fr);

// Type any because NativeStackNavigationOptions type is deprecated in Expo Router
const SCREEN_OPTIONS: Record<Device, any> = {
  ios: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitle: () => <HeaderTitle />,
    headerRight: () => <UserInfo />,
  },
  android: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitle: () => <HeaderTitle />,
    headerRight: () => <UserInfo />,
  },
  web: {
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerTitle: () => <HeaderTitle />,
    headerLeft: () => <BackButton />,
    headerRight: () => <UserInfo />,
  },
};

function RootLayout({ children }: { children: ReactNode }) {
  const device = getDevice();
  const screenOptionsByDevice = SCREEN_OPTIONS[device];

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <SupabaseOnAuthStateChange>
              <Stack screenOptions={screenOptionsByDevice}>{children}</Stack>
            </SupabaseOnAuthStateChange>
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default RootLayout;

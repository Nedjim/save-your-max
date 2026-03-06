import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { fr, registerTranslation } from 'react-native-paper-dates';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import HeaderTitle from '../components/HeaderTitle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

registerTranslation('fr', fr);

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerTransparent: true,
              headerTitleAlign: 'center',
              headerTitle: () => <HeaderTitle />,
              headerLeft: () => <BackButton />,
            }}
          >
            {children}
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;

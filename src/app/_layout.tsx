import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-gesture-handler';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { fr, registerTranslation } from 'react-native-paper-dates';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TURQUOISE } from '../constants/colors';
import RootNavigator from '../containers/routes';
import SupabaseOnAuthStateChange from '../containers/supabase/SupabaseOnAuthStateChange';

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

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <SupabaseOnAuthStateChange>
              <RootNavigator />
            </SupabaseOnAuthStateChange>
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default RootLayout;

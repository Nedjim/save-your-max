import Loader from '@/src/components/Loader';
import { useSupabaseSession } from '@/src/hooks/auth';
import { Redirect, Stack, useSegments } from 'expo-router';
import PageWrapper from '../page/PageWrapper';
import { screenOptions } from './screenOptions';

function RootNavigator() {
  const { data: session, isLoading } = useSupabaseSession();
  const segments = useSegments();

  if (isLoading) {
    return <Loader />;
  }

  const inAuthGroup = segments[0] === '(auth)';

  if (!session && !inAuthGroup) {
    return <Redirect href="/login" />;
  }
  if (session && inAuthGroup) {
    return <Redirect href="/exercises" />;
  }

  return (
    <PageWrapper>
      <Stack screenOptions={screenOptions}>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </PageWrapper>
  );
}

export default RootNavigator;

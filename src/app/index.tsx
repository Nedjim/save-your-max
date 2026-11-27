import { Redirect } from 'expo-router';
import Loader from '@/src/components/Loader';
import { useSupabaseSession } from '@/src/hooks/auth';

function Index() {
  const { data: session, isLoading } = useSupabaseSession();

  if (isLoading) {
    return <Loader />;
  }

  return <Redirect href={session ? '/exercises' : '/login'} />;
}

export default Index;

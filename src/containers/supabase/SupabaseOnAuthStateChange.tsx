import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useAuthSearchParams } from '@/src/hooks/auth';
import { supabase } from '@/src/services/supabase';
import { AuthSearchParams } from '@/src/types';

const REFRESH_TYPES_EXCEPTION: AuthSearchParams['type'][] = [
  'signup',
  'recovery',
];

function SupabaseOnAuthStateChange({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { type } = useAuthSearchParams();

  useEffect(() => {
    const shouldRefreshSession = !REFRESH_TYPES_EXCEPTION.includes(type);

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      shouldRefreshSession && queryClient.setQueryData(['session'], session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [queryClient, type]);

  return <>{children}</>;
}

export default SupabaseOnAuthStateChange;

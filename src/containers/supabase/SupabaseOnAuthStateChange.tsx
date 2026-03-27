import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useResetPasswordParams } from '@/src/hooks/auth';
import { supabase } from '@/src/services/supabase';

function SupabaseOnAuthStateChange({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { type } = useResetPasswordParams();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      type !== 'recovery' && queryClient.setQueryData(['session'], session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [queryClient, type]);

  return <>{children}</>;
}

export default SupabaseOnAuthStateChange;

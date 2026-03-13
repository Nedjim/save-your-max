import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { supabase } from '@/src/services/supabase';

function SupabaseOnAuthStateChange({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'INITIAL_SESSION') return;

      queryClient.invalidateQueries({ queryKey: ['session'] });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [queryClient]);

  return <>{children}</>;
}

export default SupabaseOnAuthStateChange;

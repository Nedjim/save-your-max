import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { createContext, type PropsWithChildren, useContext } from 'react';
import { useSignOutUser, useSupabaseSession } from '../hooks/auth';

type AuthContextType = {
  signOutUser: () => void;
  session?: Session | null;
  isLoading: boolean;
};

const DEFAULT_CONTEXT = {
  signOutUser: () => null,
  session: null,
  isLoading: false,
};

const AuthContext = createContext<AuthContextType | null>(DEFAULT_CONTEXT);

export function useSession() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const { data: session, isLoading } = useSupabaseSession();
  const { mutate: signOutMutation } = useSignOutUser();

  const router = useRouter();

  if (isLoading) {
    return null;
  }

  const signOutUser = () => {
    signOutMutation(undefined, {
      onSuccess: () => {
        router.replace('/');
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signOutUser,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { createContext, type PropsWithChildren, useContext } from 'react';
import {
  useCreateUser,
  useSignInUser,
  useSignOutUser,
  useSupabaseSession,
} from '../hooks/auth';
import { UserPayload } from '../types';

type AuthContextType = {
  createUser: (payload: UserPayload) => void;
  signInUser: (payload: UserPayload) => void;
  signOutUser: () => void;
  session?: Session | null;
  isLoading: boolean;
};

const DEFAULT_CONTEXT = {
  createUser: () => null,
  signInUser: () => null,
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
  const { mutate: signInUserMutation } = useSignInUser();
  const { mutate: signOutMutation } = useSignOutUser();
  const { mutate: createUserMutation } = useCreateUser();

  const router = useRouter();

  if (isLoading) {
    return null;
  }

  const createUser = (payload: UserPayload) => {
    createUserMutation(payload, {
      onSuccess: () => {
        router.replace('/');
      },
    });
  };

  const signInUser = (payload: UserPayload) => {
    signInUserMutation(payload, {
      onSuccess: () => {
        router.replace('/exercises');
      },
    });
  };

  const signOutUser = () => {
    signOutMutation(undefined, {
      onSuccess: () => {
        router.replace('/');
      },
    });
  };

  console.log('render provider');

  return (
    <AuthContext.Provider
      value={{
        createUser,
        signInUser,
        signOutUser,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

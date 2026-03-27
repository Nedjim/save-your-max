import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Divider from '@/src/components/Divider';
import {
  ERROR,
  LIGHT_GREY,
  MODAL_OPACITY,
  TURQUOISE,
  WHITE,
} from '@/src/constants/colors';
import { useCreateUser, useSignInUser } from '@/src/hooks/auth';
import { resetPasswordEmail } from '@/src/services/supabase';
import { AuthMode } from '@/src/types';
import AuthInputs from '../AuthInputs';
import { TEXT_BY_MODE } from './constants';

const Auth = () => {
  const router = useRouter();

  const { mutate: signInUserMutation } = useSignInUser();
  const { mutate: createUserMutation } = useCreateUser();

  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const { title, subtitle, submitButtonTitle, secondaryButtonTitle } =
    TEXT_BY_MODE[mode];

  const toggleMode = () => {
    const newMode = mode === 'signin' ? 'signup' : 'signin';
    setMode(newMode);
    clearInputs();
  };

  const clearInputs = () => {
    setEmail(null);
    setPassword(null);
    setConfirmedPassword(null);
    setError(null);
  };

  const handleSubmit = () => {
    if (!email && !password) {
      setError('Missing email and password.');
      return;
    }

    if (!email && password) {
      setError('Missing e-mail.');
      return;
    }

    if (email && !password) {
      setError('Missing password.');
      return;
    }

    if (mode === 'signup' && !!(password !== confirmedPassword)) {
      setError('Passwords are differents.');
      return;
    }

    if (email && password) {
      const payload = { email, password };

      if (mode === 'signin') {
        signInUserMutation(payload, {
          onSuccess: () => {
            router.replace('/exercises');
          },
          onError: (error) => {
            setError(error.message);
          },
        });
      } else {
        createUserMutation(payload, {
          onSuccess: () => {
            router.replace('/');
          },
          onError: (error) => {
            setError(error.message);
          },
        });
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Missing email.');
      return;
    }

    try {
      await resetPasswordEmail(email);
      setMode('resetPasswordSubmit');
      clearInputs();
    } catch {
      console.log('Reset pasword error.');
    }
  };

  return (
    <View style={styles.auth}>
      <View style={styles.form}>
        <Text style={styles.title}>{title}</Text>
        {mode === 'resetPasswordSubmit' && (
          <View style={styles.icon}>
            <Ionicons
              name="checkmark-circle"
              color={TURQUOISE}
              size={32}
              ariaHidden={true}
              style={styles.checkmarkIcon}
            />
          </View>
        )}

        <Text style={styles.subtitle}>{subtitle}</Text>

        {mode !== 'resetPasswordSubmit' && (
          <>
            <View style={styles.error}>
              {error && (
                <Ionicons name="alert-circle" color={ERROR} size={18} />
              )}
              <Text style={styles.errorMessage}>{error}</Text>
            </View>
            <AuthInputs
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={mode === 'resetPassword' ? undefined : setPassword}
              confirmedPassword={confirmedPassword}
              setConfirmedPassword={
                mode === 'signup' ? setConfirmedPassword : undefined
              }
            />
          </>
        )}

        {mode === 'signin' && (
          <Button uppercase={false} onPress={() => setMode('resetPassword')}>
            Forgot passeword ?
          </Button>
        )}

        <View style={styles.actions}>
          {submitButtonTitle && (
            <Button
              onPress={
                mode === 'resetPassword' ? handleResetPassword : handleSubmit
              }
              buttonColor={TURQUOISE}
              uppercase={false}
              textColor={WHITE}
            >
              {submitButtonTitle}
            </Button>
          )}
          {secondaryButtonTitle && (
            <>
              <Divider />
              <Button
                buttonColor={LIGHT_GREY}
                onPress={toggleMode}
                uppercase={false}
              >
                {secondaryButtonTitle}
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  auth: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    width: 320,
    padding: 20,
    marginTop: 40,
    backgroundColor: MODAL_OPACITY,
    borderRadius: 16,
    gap: 8,
  },
  title: {
    color: WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    marginTop: 24,
  },
  checkmarkIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
  actions: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  errorMessage: {
    color: ERROR,
  },
});

export default Auth;

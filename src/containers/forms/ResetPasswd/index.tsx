import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ERROR, MODAL_OPACITY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useResetPasswordParams, useSignOutUser } from '@/src/hooks/auth';
import { resetPassword } from '@/src/services/supabase';
import AuthInputs from '../AuthInputs';

function ResetPasswd() {
  const router = useRouter();
  const {
    access_token: token,
    type,
    refresh_token: refreshToken,
  } = useResetPasswordParams();
  const { mutate: signoutUserMutation } = useSignOutUser();

  const [password, setPassword] = useState<string | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleSubmit = async () => {
    if (!token || type !== 'recovery' || !refreshToken) {
      setError('Invalid URL.');
      return;
    }

    if (!password) {
      setError('Missing password.');
      return;
    }

    if (!confirmedPassword) {
      setError('Please confirm your new password.');
      return;
    }

    if (password !== confirmedPassword) {
      setError('Passwords are differents.');
      return;
    }

    try {
      await resetPassword(token, refreshToken, password);
      setPasswordUpdated(true);
      clearInputs();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const clearInputs = () => {
    setPassword(null);
    setConfirmedPassword(null);
    setError(null);
  };

  return (
    <View style={styles.auth}>
      <View style={styles.form}>
        <Text style={styles.title}>Reset password</Text>
        {passwordUpdated && (
          <View style={styles.passwordUpdated}>
            <View style={styles.icon}>
              <Ionicons
                name="checkmark-circle"
                color={TURQUOISE}
                size={32}
                ariaHidden={true}
                style={styles.checkmarkIcon}
              />
            </View>
            <Text style={styles.subtitle}>
              Your password has been updated successfully. Please sign in with
              your new password.
            </Text>
            <Button
              onPress={() => {
                signoutUserMutation(undefined, {
                  onSuccess: () => {
                    router.replace('/');
                  },
                });
              }}
              buttonColor={TURQUOISE}
              uppercase={false}
              textColor={WHITE}
            >
              Sign in
            </Button>
          </View>
        )}
        {!passwordUpdated && (
          <>
            <View style={styles.error}>
              {error && (
                <Ionicons name="alert-circle" color={ERROR} size={18} />
              )}
              <Text style={styles.errorMessage}>{error}</Text>
            </View>
            <AuthInputs
              password={password}
              confirmedPassword={confirmedPassword}
              setPassword={setPassword}
              setConfirmedPassword={setConfirmedPassword}
            />
            <View style={styles.actions}>
              <Button
                onPress={handleSubmit}
                buttonColor={TURQUOISE}
                uppercase={false}
                textColor={WHITE}
              >
                Update
              </Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

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
  actions: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
    justifyContent: 'center',
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
  passwordUpdated: {
    display: 'flex',
    gap: 24,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  checkmarkIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
  subtitle: {
    color: '#ccc',
  },
});

export default ResetPasswd;

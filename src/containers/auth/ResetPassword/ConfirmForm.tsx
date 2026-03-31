import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ERROR, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useResetPasswordParams } from '@/src/hooks/auth';
import { resetPassword } from '@/src/services/supabase';
import { AuthMode } from '@/src/types';
import AuthInputs from '../AuthInputs';
import styles from '../styles';

type ConfirmFormType = {
  setMode: (mode: AuthMode) => void;
};

function ConfirmForm(props: ConfirmFormType) {
  const { setMode } = props;
  const {
    access_token: token,
    type,
    refresh_token: refreshToken,
  } = useResetPasswordParams();

  const [password, setPassword] = useState<string | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

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
      clearInputs();
      setMode('resetPasswordDone');
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
    <>
      <Text style={styles.title}>Reset password</Text>
      <View style={styles.error}>
        {error && <Ionicons name="alert-circle" color={ERROR} size={18} />}
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
  );
}

export default ConfirmForm;

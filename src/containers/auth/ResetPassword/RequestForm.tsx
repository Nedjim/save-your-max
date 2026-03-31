import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Divider from '@/src/components/Divider';
import { ERROR, LIGHT_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { resetPasswordEmail } from '@/src/services/supabase';
import { AuthMode } from '@/src/types';
import AuthInputs from '../AuthInputs';
import styles from '../styles';

type RequestFormType = {
  setMode: (mode: AuthMode) => void;
};

function RequestForm(props: RequestFormType) {
  const { setMode } = props;
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearInputs = () => {
    setEmail(null);
    setError(null);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Missing email.');
      return;
    }

    try {
      await resetPasswordEmail(email);
      setMode('resetPasswordEmailSent');
      clearInputs();
    } catch {
      setError('Reset password error.');
    }
  };

  return (
    <>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive a link to change your password.
      </Text>

      <View style={styles.error}>
        {error && <Ionicons name="alert-circle" color={ERROR} size={18} />}
        <Text style={styles.errorMessage}>{error}</Text>
      </View>

      <AuthInputs email={email} setEmail={setEmail} />

      <View style={styles.actions}>
        <Button
          onPress={handleResetPassword}
          buttonColor={TURQUOISE}
          uppercase={false}
          textColor={WHITE}
        >
          Apply
        </Button>
        <Divider />
        <Button buttonColor={LIGHT_GREY} onPress={() => {}} uppercase={false}>
          Cancel
        </Button>
      </View>
    </>
  );
}

export default RequestForm;

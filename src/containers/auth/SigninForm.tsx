import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Divider from '@/src/components/Divider';
import { ERROR, LIGHT_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useSignInUser } from '@/src/hooks/auth';
import { AuthMode } from '@/src/types';
import AuthInputs from './AuthInputs';
import styles from './styles';

type SigninFormType = {
  setMode: (mode: AuthMode) => void;
};

const SigninForm = (props: SigninFormType) => {
  const { setMode } = props;

  const router = useRouter();
  const { mutate: signInUserMutation } = useSignInUser();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearInputs = () => {
    setEmail(null);
    setPassword(null);
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

    if (email && password) {
      const payload = { email, password };

      signInUserMutation(payload, {
        onSuccess: () => {
          router.replace('/exercises');
          clearInputs();
        },
        onError: (error) => {
          setError(error.message);
        },
      });
    }
  };

  return (
    <>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your email and password.</Text>

      <View style={styles.error}>
        {error && <Ionicons name="alert-circle" color={ERROR} size={18} />}
        <Text style={styles.errorMessage}>{error}</Text>
      </View>

      <AuthInputs
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />

      <Button uppercase={false} onPress={() => setMode('resetPasswordRequest')}>
        Forgot passeword ?
      </Button>

      <View style={styles.actions}>
        <Button
          onPress={handleSubmit}
          buttonColor={TURQUOISE}
          uppercase={false}
          textColor={WHITE}
        >
          Sign in
        </Button>
        <Divider />
        <Button
          buttonColor={LIGHT_GREY}
          onPress={() => setMode('signup')}
          uppercase={false}
        >
          Create an account
        </Button>
      </View>
    </>
  );
};

export default SigninForm;

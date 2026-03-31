import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Divider from '@/src/components/Divider';
import { ERROR, LIGHT_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useCreateUser } from '@/src/hooks/auth';
import { AuthMode } from '@/src/types';
import AuthInputs from './AuthInputs';
import styles from './styles';

type SignupFormType = {
  setMode: (mode: AuthMode) => void;
};

function SignupForm(props: SignupFormType) {
  const { setMode } = props;

  const router = useRouter();

  const { mutate: createUserMutation } = useCreateUser();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

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

    if (password !== confirmedPassword) {
      setError('Passwords are differents.');
      return;
    }

    if (email && password) {
      const payload = { email, password };

      createUserMutation(payload, {
        onSuccess: () => {
          router.replace('/');
        },
        onError: (error) => {
          setError(error.message);
        },
      });
    }
  };

  return (
    <>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>
        Enter your email and password to create your account.
      </Text>

      <View style={styles.error}>
        {error && <Ionicons name="alert-circle" color={ERROR} size={18} />}
        <Text style={styles.errorMessage}>{error}</Text>
      </View>

      <AuthInputs
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        confirmedPassword={confirmedPassword}
        setConfirmedPassword={setConfirmedPassword}
      />

      <View style={styles.actions}>
        <Button
          onPress={handleSubmit}
          buttonColor={TURQUOISE}
          uppercase={false}
          textColor={WHITE}
        >
          Create
        </Button>
        <>
          <Divider />
          <Button
            buttonColor={LIGHT_GREY}
            onPress={() => setMode('signin')}
            uppercase={false}
          >
            Sign in
          </Button>
        </>
      </View>
    </>
  );
}

export default SignupForm;

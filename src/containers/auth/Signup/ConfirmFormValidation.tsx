import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { TURQUOISE, WHITE } from '@/src/constants/colors';
import { useSignupConfirmUser } from '@/src/hooks/auth';
import styles from '../styles';

type ConfirmFormValidationProps = {
  token: string;
  refreshToken: string;
};

function ConfirmFormValidation(props: ConfirmFormValidationProps) {
  const { token, refreshToken } = props;
  const { isLoading, isSuccess, isError, error } = useSignupConfirmUser(
    token,
    refreshToken,
  );

  let content = null;

  if (isLoading) {
    content = <Text>...Loading...</Text>;
  }

  if (!isLoading && isError) {
    content = <Text>{error.message}</Text>;
  }

  if (isSuccess) {
    content = <ConfirmFormSuccess />;
  }

  return <>{content}</>;
}

function ConfirmFormSuccess() {
  const router = useRouter();

  return (
    <>
      <Text style={styles.title}>Email Successfully Confirmed!</Text>
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
        Your email address has been successfully verified. You can now access
        your account and enjoy all the features of the application.
      </Text>
      <View style={styles.actions}>
        <Button
          onPress={() => router.push('/')}
          style={{ backgroundColor: TURQUOISE }}
          labelStyle={{ color: WHITE }}
          uppercase={false}
        >
          Go to My Account
        </Button>
      </View>
    </>
  );
}

export default ConfirmFormValidation;

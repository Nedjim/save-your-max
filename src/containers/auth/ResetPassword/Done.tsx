import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { TURQUOISE, WHITE } from '@/src/constants/colors';
import { useSignOutUser } from '@/src/hooks/auth';
import styles from '../styles';

function Done() {
  const router = useRouter();
  const { mutate: signoutUserMutation } = useSignOutUser();

  return (
    <>
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
        Your password has been updated successfully. Please sign in with your
        new password.
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
    </>
  );
}

export default Done;

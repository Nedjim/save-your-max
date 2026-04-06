import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Divider from '@/src/components/Divider';
import { LIGHT_GREY } from '@/src/constants/colors';
import styles from '../styles';

function ConfirmFormError() {
  const router = useRouter();

  return (
    <View>
      <Text style={styles.title}>Invalid verification link</Text>
      <Text style={styles.subtitle}>
        The link you used is invalid or has expired for security reasons. Please
        restart the signup process to receive a new verification link.
      </Text>
      <View style={styles.actions}>
        <Divider />
        <Button
          buttonColor={LIGHT_GREY}
          onPress={() => router.push('/')}
          uppercase={false}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}

export default ConfirmFormError;

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Divider from '@/src/components/Divider';
import { LIGHT_GREY, TURQUOISE } from '@/src/constants/colors';
import { AuthMode } from '@/src/types';
import styles from '../styles';

type EmailSentType = {
  setMode: (mode: AuthMode) => void;
};

function EmailSent(props: EmailSentType) {
  const { setMode } = props;
  return (
    <>
      <Text style={styles.title}>Email successfuly sent!</Text>

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
        If an account exists, you’ll receive a password reset link shortly.
        Please follow the instructions.
      </Text>
      <Divider />
      <Button
        buttonColor={LIGHT_GREY}
        onPress={() => setMode('signin')}
        uppercase={false}
      >
        Cancel
      </Button>
    </>
  );
}

export default EmailSent;

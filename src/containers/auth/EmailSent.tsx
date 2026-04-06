import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Divider from '@/src/components/Divider';
import { LIGHT_GREY, TURQUOISE } from '@/src/constants/colors';
import { AuthMode } from '@/src/types';
import styles from './styles';

type EmailSentType = {
  setMode: (mode: AuthMode) => void;
  subtitle: string;
};

function EmailSent(props: EmailSentType) {
  const { setMode, subtitle } = props;
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
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

      <Text style={styles.subtitle}>{subtitle}</Text>
      <Divider />
      <Button
        buttonColor={LIGHT_GREY}
        onPress={() => setMode('signinRequest')}
        uppercase={false}
      >
        Cancel
      </Button>
    </Animated.View>
  );
}

export default EmailSent;

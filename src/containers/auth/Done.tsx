import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TURQUOISE, WHITE } from '@/src/constants/colors';
import { useSignOutUser } from '@/src/hooks/auth';
import styles from './styles';

type DoneProps = {
  subtitle: string;
};

function Done(props: DoneProps) {
  const { subtitle } = props;

  const router = useRouter();
  const { mutate: signoutUserMutation, isPending } = useSignOutUser();

  const handlePress = () => {
    signoutUserMutation(undefined, {
      onSuccess: () => {
        router.replace('/');
      },
    });
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
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
      <Button
        onPress={handlePress}
        uppercase={false}
        style={{ backgroundColor: TURQUOISE }}
        labelStyle={{ color: WHITE }}
        loading={isPending}
        disabled={isPending}
      >
        Sign in
      </Button>
    </Animated.View>
  );
}

export default Done;

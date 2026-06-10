import { useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ConfirmFormError from './ConfirmFormError';
import ConfirmFormValidation from './ConfirmFormValidation';

function SignupConfirmForm() {
  const { code } = useLocalSearchParams<{
    code?: string;
  }>();

  let content = null;

  if (!code) {
    content = <ConfirmFormError />;
  } else {
    content = <ConfirmFormValidation code={code} />;
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      {content}
    </Animated.View>
  );
}

export default SignupConfirmForm;

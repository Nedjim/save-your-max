import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useAuthSearchParams } from '@/src/hooks/auth';
import ConfirmFormError from './ConfirmFormError';
import ConfirmFormValidation from './ConfirmFormValidation';

function SignupConfirmForm() {
  const {
    access_token: token,
    refresh_token: refreshToken,
    type,
  } = useAuthSearchParams();

  const isValidLink = type === 'signup' && token && refreshToken;

  let content = null;

  if (!isValidLink) {
    content = <ConfirmFormError />;
  } else {
    content = (
      <ConfirmFormValidation token={token} refreshToken={refreshToken} />
    );
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      {content}
    </Animated.View>
  );
}

export default SignupConfirmForm;

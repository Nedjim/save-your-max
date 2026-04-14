import { Button } from 'react-native-paper';
import { ERROR } from '@/src/constants/colors';
import { useSignOutUser, useSupabaseSession } from '@/src/hooks/auth';

const SignoutButton = () => {
  const { mutateAsync: signoutUserMutation } = useSignOutUser();
  const { resetSession } = useSupabaseSession();

  const handleSignout = async () => {
    try {
      await signoutUserMutation();
      resetSession();
    } catch {
      // WIP: error toast
    }
  };

  return (
    <Button
      labelStyle={{ color: ERROR }}
      accessibilityLabel="Log out"
      onPress={handleSignout}
      mode="text"
    >
      Log out
    </Button>
  );
};

export default SignoutButton;

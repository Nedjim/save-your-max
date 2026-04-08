import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { DARK_GREY, WHITE } from '@/src/constants/colors';
import { useSignOutUser } from '@/src/hooks/auth';

type SignoutButtonProps = {
  refetch: () => void;
};

function SignoutButton(props: SignoutButtonProps) {
  const { refetch } = props;
  const router = useRouter();
  const { mutateAsync: signoutUserMutation } = useSignOutUser();

  const handleSignout = async () => {
    try {
      await signoutUserMutation();
      refetch();
      router.replace('/login');
    } catch {
      // WIP: error toast
    }
  };

  return (
    <Button
      style={{ backgroundColor: DARK_GREY }}
      labelStyle={{ color: WHITE }}
      accessibilityLabel="Log out"
      onPress={handleSignout}
    >
      Log out
    </Button>
  );
}

export default SignoutButton;

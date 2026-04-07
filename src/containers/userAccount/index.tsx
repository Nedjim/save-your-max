import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import UpdatePasswordModal from './UpdatePassword/Modal';
import Alert from '@/src/components/Alert';
import Divider from '@/src/components/Divider';
import {
  DARK_GREY,
  DEFAULT_CONTAINER_BACKGROUND,
  ERROR,
  TURQUOISE,
  WHITE,
} from '@/src/constants/colors';
import { useSignOutUser, useSupabaseSession } from '@/src/hooks/auth';
import { useDeleteProfile } from '@/src/hooks/profile';
import { Profile } from '@/src/types';
import UserInput from './UserInput';

type UserAccountType = {
  profile: Profile;
};

const UserAccount = (props: UserAccountType) => {
  const { profile } = props;
  const router = useRouter();
  const { mutate: deleteUserMutation } = useDeleteProfile();
  const { mutate: signoutUserMutation } = useSignOutUser();
  const { data: session } = useSupabaseSession();
  const [showAlert, setShowAlert] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  const email = session?.user.user_metadata.email;

  console.log({ profile });
  const handleDelete = async () => {
    deleteUserMutation(undefined, {
      onSuccess: async () => {
        router.replace('/login');
      },
    });
  };

  const handleSignout = () => {
    signoutUserMutation(undefined, {
      onSuccess: () => {
        router.replace('/login');
      },
    });
  };

  return (
    <View style={styles.userAccount}>
      <View style={styles.userAccountHeader}>
        <Ionicons
          name="close"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace('/')
          }
          color={DARK_GREY}
          size={16}
          ariaHidden={true}
        />
      </View>

      <Text style={styles.title}>Account informations</Text>
      <View style={styles.informations}>
        <UserAccountRow value="firstname" id="firstname" />
        <UserAccountRow value="lastname" id="lastname" />
        <UserAccountRow value="username" id="username" />
      </View>
      <Divider />
      <View style={styles.actions}>
        <UserAccountRow value={email} id="email" />
        <Button
          onPress={() => {}}
          style={{ backgroundColor: TURQUOISE }}
          labelStyle={{ color: WHITE }}
          uppercase={false}
        >
          Change email address
        </Button>
        <Button
          onPress={() => setUpdatePassword(true)}
          style={{ backgroundColor: TURQUOISE }}
          labelStyle={{ color: WHITE }}
          uppercase={false}
        >
          Change password
        </Button>
      </View>

      <Divider />
      <View style={styles.actions}>
        <Button
          style={{ backgroundColor: DARK_GREY }}
          labelStyle={{ color: WHITE }}
          accessibilityLabel="Log out"
          onPress={handleSignout}
        >
          Log out
        </Button>
        <Button
          style={{ backgroundColor: ERROR }}
          labelStyle={{ color: WHITE }}
          accessibilityLabel="Delete account"
          onPress={() => {
            setShowAlert(true);
          }}
        >
          Delete account
        </Button>
      </View>
      {updatePassword && (
        <UpdatePasswordModal
          visible={updatePassword}
          closeModal={() => setUpdatePassword(false)}
        />
      )}
      {showAlert && (
        <Alert
          description="Your account is about to be deleted."
          onClose={() => {
            setShowAlert(false);
          }}
          onSubmit={handleDelete}
        />
      )}
    </View>
  );
};

type UserAccountRowProps = {
  id: string;
  value: string;
};

function UserAccountRow(props: UserAccountRowProps) {
  const { id, value } = props;

  return (
    <View style={styles.row}>
      <UserInput value={value} id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  userAccount: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    padding: 16,
  },
  userAccountHeader: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  title: {
    color: WHITE,
    fontSize: 24,
    textAlign: 'center',
    padding: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  informations: {
    marginVertical: 16,
    color: WHITE,
    display: 'flex',
    gap: 8,
  },

  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },
});

export default UserAccount;

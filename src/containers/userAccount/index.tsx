import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Alert from '@/src/components/Alert';
import {
  DARK_GREY,
  DEFAULT_CONTAINER_BACKGROUND,
  ERROR,
  WHITE,
} from '@/src/constants/colors';
import { useSignOutUser } from '@/src/hooks/auth';
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

  const [showAlert, setShowAlert] = useState(false);

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
      <Text style={styles.title}>Account informations</Text>
      <View style={styles.informations}>
        <UserInput value="Surname" id="name" />
        <UserInput value="Name" id="name" />
        <UserInput value="Pseudo" id="pseudo" />
        <UserInput value="E-mail" id="email" />
        <UserInput value="Password" id="password" />
      </View>
      <View style={styles.actions}>
        <Button
          title="Log out"
          color={DARK_GREY}
          accessibilityLabel="Log out"
          onPress={handleSignout}
        />
        <Button
          title="Delete"
          color={ERROR}
          accessibilityLabel="Delete account"
          onPress={() => {
            setShowAlert(true);
          }}
        />
      </View>
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

const styles = StyleSheet.create({
  userAccount: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    padding: 16,
  },
  title: {
    color: WHITE,
    fontSize: 24,
    textAlign: 'center',
    padding: 16,
  },
  informations: {
    marginTop: 16,
    color: WHITE,
    display: 'flex',
    gap: 8,
  },
  actions: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
});

export default UserAccount;

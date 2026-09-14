import { StyleSheet, View } from 'react-native';
import DeleteUserProfileButton from './Buttons/DeleteUserProfileButton';
import SignOutButton from './Buttons/SignOutButton';
import { DEFAULT_CONTAINER_BACKGROUND } from '@/src/constants/colors';
import UserProfileHeader from './Header';
import UserProfileInformations from './Informations.tsx';

const ProfilePage = () => {
  return (
    <View style={styles.profile}>
      <UserProfileHeader />
      <UserProfileInformations />
      <View style={styles.actions}>
        <SignOutButton />
        <DeleteUserProfileButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    padding: 8,
    borderRadius: 8,
  },
  actions: {
    display: 'flex',
  },
});

export default ProfilePage;

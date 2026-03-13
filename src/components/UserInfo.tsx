import { Button, StyleSheet, View } from 'react-native';
import { TURQUOISE, WHITE } from '../constants/colors';
import { useSignOutUser } from '../hooks/auth';

const UserInfo = () => {
  const { mutate: signOutMutation } = useSignOutUser();

  const signOut = () => {
    signOutMutation();
  };

  return (
    <View style={styles.userInfo}>
      {/* <Text style={styles.name}>Welcome</Text> */}
      <Button title="Logout" onPress={signOut} color={TURQUOISE} />
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'rgba(28, 35, 44, 0.69)',
    // borderRadius: 8,
    // margin: 20,
    // padding: 12,
    // gap: 16,
  },
  name: { color: WHITE },
});

export default UserInfo;

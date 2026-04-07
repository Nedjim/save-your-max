import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TURQUOISE, WHITE } from '@/src/constants/colors';

const UpdatePasswordSuccess = () => {
  return (
    <View style={styles.success}>
      <Ionicons
        name="checkmark-circle"
        color={TURQUOISE}
        size={32}
        ariaHidden={true}
      />
      <Text style={styles.successMessage}>Password successfuly updated!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  success: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successMessage: {
    color: WHITE,
  },
});

export default UpdatePasswordSuccess;

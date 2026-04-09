import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TURQUOISE, WHITE } from '@/src/constants/colors';

const UpdateEmailSent = () => {
  return (
    <View style={styles.success}>
      <Ionicons name="mail" color={TURQUOISE} size={32} ariaHidden={true} />
      <Text style={styles.successMessage}>
        Please confirm your email in your mail box!
      </Text>
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

export default UpdateEmailSent;

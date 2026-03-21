import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { TURQUOISE, WHITE } from '@/src/constants/colors';

type AddMoreButtonType = {
  onPress: () => void;
  accessibilityLabel: string;
};

function AddMoreButton(props: AddMoreButtonType) {
  const { onPress, accessibilityLabel } = props;

  return (
    <Pressable onPress={onPress} accessibilityLabel={accessibilityLabel}>
      <View style={styles.addMoreButton}>
        <Ionicons name="add" size={24} color={WHITE} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addMoreButton: {
    backgroundColor: TURQUOISE,
    padding: 8,
    borderRadius: 20,
  },
});
export default AddMoreButton;

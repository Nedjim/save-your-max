import { StyleSheet, Text, View } from 'react-native';
import { TURQUOISE } from '../constants/colors';

const Tag = (props: { label: string }) => {
  const { label } = props;

  return (
    <View style={styles.tag}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: TURQUOISE,
    borderRadius: 8,
    padding: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default Tag;

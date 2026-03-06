import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

const Overlay = () => {
  return <View style={styles.overlay} />;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
});

export default memo(Overlay);

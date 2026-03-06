import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { WHITE } from '../constants/colors';

const HeaderTitle = () => {
  return <Text style={styles.header}>Save your max !</Text>;
};

const styles = StyleSheet.create({
  header: { color: WHITE, fontSize: 28 },
});

export default memo(HeaderTitle);

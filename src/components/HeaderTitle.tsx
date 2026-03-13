import { StyleSheet, Text } from 'react-native';
import { WHITE } from '../constants/colors';

const HeaderTitle = () => {
  return <Text style={styles.title}>Save your max !</Text>;
};

const styles = StyleSheet.create({
  title: { color: WHITE, fontSize: 28 },
});

export default HeaderTitle;

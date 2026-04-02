import { StyleSheet } from 'react-native';
import { WHITE } from '@/src/constants/colors';

const styles = StyleSheet.create({
  title: {
    color: WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    marginVertical: 16,
  },
  fields: {
    gap: 16,
    marginVertical: 16,
  },
  actions: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  checkmarkIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default styles;

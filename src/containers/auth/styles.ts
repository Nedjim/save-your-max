import { StyleSheet } from 'react-native';
import { ERROR, WHITE } from '@/src/constants/colors';

const styles = StyleSheet.create({
  title: {
    color: WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    marginTop: 24,
  },
  actions: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
    justifyContent: 'center',
  },
  error: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  errorMessage: {
    color: ERROR,
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

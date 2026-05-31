import { ActivityIndicator } from 'react-native';
import { WHITE } from '../constants/colors';

const Loader = () => {
  return <ActivityIndicator size="large" color={WHITE} />;
};

export default Loader;

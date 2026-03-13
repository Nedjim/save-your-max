import { Platform } from 'react-native';

export const getDevice = () => {
  switch (Platform.OS) {
    case 'ios':
    case 'android':
    case 'web':
      return Platform.OS;
    default:
      return 'web';
  }
};

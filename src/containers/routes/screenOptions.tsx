import { HeaderTitle } from '@react-navigation/elements';
import { View } from 'react-native';
import BackButton from '@/src/components/Buttons/BackButton';
import UserButton from '@/src/components/Buttons/UserButton';
import { BLACK } from '@/src/constants/colors';
import { Device } from '@/src/types';

// Type any because NativeStackNavigationOptions type is deprecated in Expo Router
const SCREEN_OPTIONS: Record<Device, any> = {
  ios: {
    headerStyle: {
      backgroundColor: BLACK,
    },
    headerTitle: () => <HeaderTitle />,
    headerRight: () => (
      <View style={{ marginRight: -36 }}>
        <UserButton />
      </View>
    ),
    headerRightContainerStyle: {
      marginRight: 0,
    },
  },
  android: {
    headerStyle: {
      backgroundColor: BLACK,
    },
    headerTitle: () => <HeaderTitle />,
    headerRight: () => <UserButton />,
  },
  web: {
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerTitle: () => <HeaderTitle />,
    headerLeft: () => <BackButton />,
    headerRight: () => <UserButton />,
  },
};

export default SCREEN_OPTIONS;

import { HeaderTitle } from '@react-navigation/elements';
import { View } from 'react-native';
import BackButton from '@/src/components/Buttons/BackButton';
import HomeButton from '@/src/components/Buttons/HomeButton';
import UserButton from '@/src/components/Buttons/UserButton';
import { BLACK } from '@/src/constants/colors';
import { Device } from '@/src/types';

const MARGIN_RIGHT_IOS = -36;

// Type any because NativeStackNavigationOptions type is deprecated in Expo Router
const SCREEN_OPTIONS: Record<Device, any> = {
  ios: {
    headerStyle: {
      backgroundColor: BLACK,
    },
    headerTitle: () => <HeaderTitle />,
    headerLeft: () => (
      <View style={{ marginRight: MARGIN_RIGHT_IOS }}>
        <HomeButton />
      </View>
    ),
    headerRight: () => (
      <View style={{ marginRight: MARGIN_RIGHT_IOS }}>
        <UserButton />
      </View>
    ),
  },
  android: {
    headerStyle: {
      backgroundColor: BLACK,
    },
    headerTitle: () => <HeaderTitle />,
    headerLeft: () => <HomeButton />,
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

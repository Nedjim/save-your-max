import { HeaderTitle } from '@react-navigation/elements';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { View } from 'react-native';
import BackButton from '@/src/components/Buttons/BackButton';
import HomeButton from '@/src/components/Buttons/HomeButton';
import UserButton from '@/src/components/Buttons/UserButton';
import { BLACK } from '@/src/constants/colors';
import { Device } from '@/src/types';

const MARGIN_RIGHT_IOS = -36;

const IOSScreenOptions = {
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
};

const AndroidScreenOptions = {
  headerStyle: {
    backgroundColor: BLACK,
  },
  headerTitle: () => <HeaderTitle />,
  headerLeft: () => <HomeButton />,
  headerRight: () => <UserButton />,
};

const WebScreenOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center' as const,
  headerTitle: () => <HeaderTitle />,
  headerLeft: () => <BackButton />,
  headerRight: () => <UserButton />,
};

const SCREEN_OPTIONS: Record<Device, NativeStackNavigationOptions> = {
  [Device.IOS]: IOSScreenOptions,
  [Device.Android]: AndroidScreenOptions,
  [Device.Web]: WebScreenOptions,
};

export default SCREEN_OPTIONS;

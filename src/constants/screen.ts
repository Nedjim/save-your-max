import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import BackButton from '../components/Buttons/BackButton';
import { BACKGROUND, DARK_GREY, GREY, TURQUOISE, WHITE } from './colors';

export const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: 'transparent',
  },
  contentStyle: {
    backgroundColor: BACKGROUND,
  },
};

export const CHILD_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  ...DEFAULT_SCREEN_OPTIONS,
  headerTintColor: WHITE,
  headerLeft: BackButton,
  headerBackVisible: false,
  animation: 'simple_push',
};

export const BOTTOM_TAB_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  sceneStyle: {
    backgroundColor: 'transparent',
  },
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerShadowVisible: false,
  headerTitleStyle: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '700',
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopColor: DARK_GREY,
  },
  tabBarActiveTintColor: TURQUOISE,
  tabBarInactiveTintColor: GREY,
};

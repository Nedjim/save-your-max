import { Stack, Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import BackButton from '../components/Buttons/BackButton';
import { BACKGROUND, DARK_GREY, GREY, TURQUOISE, WHITE } from './colors';

type StackScreenOptions = NonNullable<
  ComponentProps<typeof Stack>['screenOptions']
>;

export const DEFAULT_SCREEN_OPTIONS = {
  headerStyle: {
    backgroundColor: 'transparent',
  },
  contentStyle: {
    backgroundColor: BACKGROUND,
  },
} satisfies StackScreenOptions;

export const CHILD_SCREEN_OPTIONS = {
  ...DEFAULT_SCREEN_OPTIONS,
  headerTintColor: WHITE,
  headerLeft: BackButton,
  headerBackVisible: false,
  animation: 'simple_push',
} satisfies StackScreenOptions;

export const BOTTOM_TAB_SCREEN_OPTIONS = {
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
} satisfies NonNullable<ComponentProps<typeof Tabs>['screenOptions']>;

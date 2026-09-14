import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { DARK_GREY, GREY, TURQUOISE, WHITE } from '@/src/constants/colors';

const SCREEN_OPTIONS: BottomTabNavigationOptions = {
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

type NavigationItem = {
  name: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  iconOutline: ComponentProps<typeof Ionicons>['name'];
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'home', icon: 'home', iconOutline: 'home-outline' },
  { name: 'planner', icon: 'calendar', iconOutline: 'calendar-outline' },
  {
    name: 'exercises',
    icon: 'barbell',
    iconOutline: 'barbell-outline',
  },
  { name: 'profile', icon: 'person', iconOutline: 'person-outline' },
];

export default function AppLayout() {
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={SCREEN_OPTIONS}>
      {NAVIGATION_ITEMS.map((item) => {
        const key = `${item.name}-navigation-tab`;
        const name = `${item.name}/index`;
        const title = t(`${item.name}.navigation_title`);

        return (
          <Tabs.Screen
            key={key}
            name={name}
            options={{
              title,
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? item.icon : item.iconOutline}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        );
      })}
      {NAVIGATION_ITEMS.map((item) => {
        return (
          <Tabs.Screen
            key={`${item.name}[id]-navigation-tab`}
            name={`${item.name}/[id]`}
            options={{
              href: null,
            }}
          />
        );
      })}
    </Tabs>
  );
}

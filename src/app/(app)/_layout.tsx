import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { BOTTOM_TAB_SCREEN_OPTIONS } from '@/src/constants/screen';

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
    <Tabs screenOptions={BOTTOM_TAB_SCREEN_OPTIONS}>
      {NAVIGATION_ITEMS.map((item) => {
        const key = `${item.name}-navigation-tab`;
        const name =
          item.name === 'exercises' ? 'exercises' : `${item.name}/index`;
        const title = t(`${item.name}.navigation_title`);

        return (
          <Tabs.Screen
            key={key}
            name={name}
            options={{
              title,
              headerShown: false,
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
    </Tabs>
  );
}

import { ReactNode } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';

type DesktopOnlyProps = {
  children: ReactNode;
  breakpoint?: number;
};

export default function DesktopOnly(props: DesktopOnlyProps) {
  const { children, breakpoint = 1024 } = props;
  const { width } = useWindowDimensions();

  const isDesktop = Platform.OS === 'web' && width >= breakpoint;

  if (!isDesktop) return null;

  return <View>{children}</View>;
}

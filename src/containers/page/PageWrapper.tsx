import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type PageWrapperProps = { children: ReactNode };

const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default PageWrapper;

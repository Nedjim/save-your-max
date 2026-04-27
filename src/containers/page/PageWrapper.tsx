import { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Overlay from '../../components/Overlay';

const image = require('../../assets/background.jpg');

type PageWrapperProps = { children: ReactNode };

const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.background}
    >
      <Overlay />
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
        {children}
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default PageWrapper;

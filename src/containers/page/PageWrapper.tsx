import { ReactNode } from 'react';
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Overlay from '../../components/Overlay';

const image = require('../../assets/background.jpg');

type PageWrapperProps = { children: ReactNode };

export default function PageWrapper(props: PageWrapperProps) {
  const { children } = props;

  const { height, width } = useWindowDimensions();

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      imageStyle={{ width, height }}
      style={styles.background}
    >
      <Overlay />
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.content]}
      >
        {children}
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 40,
  },
});

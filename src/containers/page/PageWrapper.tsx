import { useHeaderHeight } from '@react-navigation/elements';
import { ReactNode } from 'react';
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Overlay from '../../components/Overlay';

const image = require('../../assets/background.jpg');

type PageWrapperProps = { children: ReactNode };

export default function PageWrapper(props: PageWrapperProps) {
  const { children } = props;

  const { height, width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      imageStyle={{ width, height }}
      style={styles.background}
    >
      <Overlay />
      <View style={[styles.content, { paddingTop: headerHeight }]}>
        {children}
      </View>
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
    marginTop: 14,
  },
});

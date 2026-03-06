import { useHeaderHeight } from '@react-navigation/elements';
import { memo, ReactNode } from 'react';
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Overlay from './Overlay';

const image = require('../assets/background.jpg');

type PageWrapperProps = { children: ReactNode };

const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;

  const { height, width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

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
};

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

export default memo(PageWrapper);

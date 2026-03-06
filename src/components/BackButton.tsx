import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../constants/colors';
import DesktopOnly from './DesktopOnly';

const BackButton = () => {
  const router = useRouter();

  if (!router.canGoBack()) {
    return null;
  }

  return (
    <Pressable onPress={() => router.back()}>
      <View style={styles.backButton}>
        <Ionicons name="arrow-back" size={18} color={WHITE} />
        <DesktopOnly>
          <Text style={styles.backButtonLabel}>Go back</Text>
        </DesktopOnly>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 32,
    gap: 8,
  },
  backButtonLabel: {
    fontSize: 16,
    color: WHITE,
  },
});

export default memo(BackButton);

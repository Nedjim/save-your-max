import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { WHITE } from '@/src/constants/colors';

export default function BackButton() {
  const router = useRouter();
  const { t } = useTranslation();

  if (!router.canGoBack()) {
    return null;
  }

  return (
    <View style={styles.backButton}>
      <Pressable
        hitSlop={8}
        accessibilityLabel={t('actions.back')}
        style={styles.pressable}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={18} color={WHITE} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

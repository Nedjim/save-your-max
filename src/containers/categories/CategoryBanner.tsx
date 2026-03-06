import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DEFAULT_CONTAINER_BACKGROUND,
  LIGHT_GREY,
} from '../../constants/colors';
import Alert from '@/src/components/Alert';

type CategoryBannerProps = {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  onPress?: () => void;
};

export default function CategoryBanner(props: CategoryBannerProps) {
  const { title, id, onPress, onDelete } = props;
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.banner}>
        <Ionicons name="chevron-forward" color={LIGHT_GREY} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.options}>
          <Pressable
            onPress={(e) => {
              e.preventDefault();
              setAlertVisible(true);
            }}
          >
            <Ionicons name="close" color={LIGHT_GREY} />
          </Pressable>
        </View>
      </TouchableOpacity>

      <Alert
        visible={alertVisible}
        onClose={() => {
          setAlertVisible(false);
        }}
        description={`The category ${title} is about to be deleted.`}
        onSubmit={() => {
          onDelete(id);
          setAlertVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    color: LIGHT_GREY,
  },
  title: {
    fontSize: 16,
    color: LIGHT_GREY,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
});

import { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BLACK,
  LIGHT_GREY,
  MEDIUM_GREY,
  TURQUOISE,
} from '../../constants/colors';
import Alert from '@/src/components/Alert';
import AntDesign from '@expo/vector-icons/AntDesign';

type CategoryBannerProps = {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onPress?: () => void;
};

const CategoryBanner = (props: CategoryBannerProps) => {
  const { title, id, isSelected = false, onPress, onDelete } = props;
  const [alertVisible, setAlertVisible] = useState(false);

  const backgroundColor = isSelected ? TURQUOISE : MEDIUM_GREY;
  const color = isSelected ? BLACK : LIGHT_GREY;

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.banner, { backgroundColor }]}
      >
        <AntDesign
          name={isSelected ? 'caret-up' : 'caret-down'}
          size={12}
          color={color}
        />
        <Text style={[styles.title, { color }]}>{title}</Text>
        <View style={styles.options}>
          <AntDesign
            name={'close'}
            size={14}
            color={color}
            onPress={(e) => {
              setAlertVisible(true);
              e.stopPropagation();
            }}
          />
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
};

const styles = StyleSheet.create({
  banner: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subBanner: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
});

export default memo(CategoryBanner);

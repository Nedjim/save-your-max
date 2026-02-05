import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BLACK,
  LIGHT_GREY,
  MEDIUM_GREY,
  TURQUOISE,
} from '../../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';

type CategoryBannerProps = {
  title: string;
  isSelected?: boolean;
  onPress?: () => void;
};

const CategoryBanner = (props: CategoryBannerProps) => {
  const { title, isSelected = false, onPress } = props;

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
            name={'edit'}
            size={12}
            color={color}
            onPress={(e) => {
              e.stopPropagation();
            }}
          />
          <AntDesign
            name={'close'}
            size={12}
            color={color}
            onPress={(e) => {
              e.stopPropagation();
            }}
          />
        </View>
      </TouchableOpacity>
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
    gap: 16,
  },
});

export default memo(CategoryBanner);

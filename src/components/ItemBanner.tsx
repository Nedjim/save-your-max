import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BLACK, LIGHT_GREY, MEDIUM_GREY, PURPLE } from '../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Item } from '../types';

type ItemBannerProps = {
  item: Item;
  isSelected: boolean;
  onPress: () => void;
};

const ItemBanner = (props: ItemBannerProps) => {
  const { item, isSelected, onPress } = props;

  const backgroundColor = isSelected ? PURPLE : MEDIUM_GREY;
  const color = isSelected ? BLACK : LIGHT_GREY;

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.banner, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{item.title}</Text>
        <AntDesign name={isSelected ? 'up' : 'down'} size={12} color={color} />
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
  title: {
    fontSize: 16,
  },
});

export default ItemBanner;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BLACK, LIGHT_GREY, MEDIUM_GREY, TURQUOISE } from '../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import ItemRow from './ItemRow';

type ItemBannerProps = {
  title: string;
  isSelected?: boolean;
  onPress?: () => void;
};

const ItemBanner = (props: ItemBannerProps) => {
  const { title, isSelected = false, onPress } = props;

  const backgroundColor = isSelected ? TURQUOISE : MEDIUM_GREY;
  const color = isSelected ? BLACK : LIGHT_GREY;

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.banner, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
        <AntDesign name={isSelected ? 'up' : 'down'} size={12} color={color} />
      </TouchableOpacity>
      {isSelected && (
        <View style={styles.subBanner}>
          <ItemRow values={['Date', 'Charge', 'Reps']} />
        </View>
      )}
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
});

export default ItemBanner;

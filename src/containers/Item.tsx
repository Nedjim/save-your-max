import { StyleSheet, View } from 'react-native';
import ItemBanner from '../components/ItemBanner';
import ItemRow from '../components/ItemRow';
import { LIGHT_GREY } from '../constants/colors';
import { DATE_FORMAT } from '../constants';
import { Item as ItemType } from '../types';

type ItemProps = {
  item: ItemType;
  onPress: () => void;
  isSelected: boolean;
};

const Item = (props: ItemProps) => {
  const { item, onPress, isSelected } = props;
  const { values } = item;
  return (
    <View>
      <ItemBanner item={item} isSelected={isSelected} onPress={onPress} />

      <View style={[styles.details, !isSelected && styles.hidden]}>
        <ItemRow values={['Date', 'Charge', 'Reps']} />
        <View>
          {values.map(({ charge, reps, date }, key) => {
            const formattedDate = date.format(DATE_FORMAT);

            return <ItemRow key={key} values={[formattedDate, charge, reps]} />;
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 4,
    padding: 16,
    gap: 16,
  },
  hidden: {
    height: 0,
    padding: 0,
  },
});

export default Item;

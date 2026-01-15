import { StyleSheet, View } from 'react-native';
import ItemRow from '../components/ItemRow';
import { LIGHT_GREY } from '../constants/colors';
import { DATE_FORMAT } from '../constants';
import { ItemValue } from '../types';

type ItemProps = {
  item: ItemValue;
};

const Item = (props: ItemProps) => {
  const { item } = props;
  const { charge, reps, date } = item;
  const formattedDate = date.format(DATE_FORMAT);

  return (
    <View style={styles.details}>
      <ItemRow values={[formattedDate, charge, reps]} />
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 4,
    padding: 8,
  },
});

export default Item;

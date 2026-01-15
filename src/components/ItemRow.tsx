import { StyleSheet, Text, View } from 'react-native';

type ItemRowProps = {
  values: (string | number)[];
};

const ItemRow = (props: ItemRowProps) => {
  const { values } = props;

  return (
    <View style={styles.row}>
      {values.map((value, key) => {
        return <Text key={key}>{value}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    padding: 4,
  },
});

export default ItemRow;

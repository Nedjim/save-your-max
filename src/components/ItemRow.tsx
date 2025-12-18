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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default ItemRow;

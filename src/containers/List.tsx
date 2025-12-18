import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Item as ItemType } from '../types';
import Item from './Item';

type ListProps = {
  data: ItemType[];
};

const List = (props: ListProps) => {
  const { data } = props;
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <View style={styles.list}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Item
              item={item}
              onPress={() =>
                selectedId === item.id
                  ? setSelectedId(undefined)
                  : setSelectedId(item.id)
              }
              isSelected={item.id === selectedId}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default List;

import { useState } from "react";
import { FlatList, View } from "react-native";
import { Item as ItemType } from "../types";
import Item from "../components/Item";

type ListProps = {
  data: ItemType[];
};

const List = (props: ListProps) => {
  const { data } = props;
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
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

export default List;

import { useState } from "react";
import { FlatList, View } from "react-native";
import { Item as ItemType } from "../types";
import { BLACK, DARK_PURPLE, PURPLE, WHITE } from "../constants/colors";
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
          const backgroundColor = item.id === selectedId ? DARK_PURPLE : PURPLE;
          const color = item.id === selectedId ? WHITE : BLACK;

          return (
            <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
              backgroundColor={backgroundColor}
              textColor={color}
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

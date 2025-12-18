import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Item as ItemType } from "../types";

type ItemProps = {
  item: ItemType;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = (props: ItemProps) => {
  const { item, onPress, backgroundColor, textColor } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
  },
});

export default Item;

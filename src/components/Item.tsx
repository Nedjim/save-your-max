import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Item as ItemType } from "../types";
import { BLACK, LIGHT_GREY, MEDIUM_GREY, PURPLE } from "../constants/colors";
import IconButton from "./IconButton";

type ItemProps = {
  item: ItemType;
  onPress: () => void;
  isSelected: boolean;
};

const Item = (props: ItemProps) => {
  const { item, onPress, isSelected } = props;

  const backgroundColor = isSelected ? PURPLE : MEDIUM_GREY;
  const color = isSelected ? BLACK : LIGHT_GREY;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.title, { color }]}>{item.title}</Text>
      <IconButton onPress={() => {}} name="down" size={12} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
});

export default Item;

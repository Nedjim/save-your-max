import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BLACK, TURQUOISE } from "../constants/colors";

type IconTypes = "plus" | "close" | "down" | "up";

type IconButtonProps = {
  onPress: () => void;
  name: IconTypes;
  type?: "default" | "primary";
  color?: string;
  size?: number;
};

const IconButton = (props: IconButtonProps) => {
  const { onPress, name, type = "default", size = 24, color = BLACK } = props;

  return (
    <View style={styles.section}>
      <Pressable style={[styles.button, styles[type]]} onPress={onPress}>
        <Text style={styles.icon}>
          <AntDesign name={name} size={size} color={color} />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    display: "flex",
    alignItems: "flex-end",
  },
  button: {
    width: 35,
    padding: 4,
  },
  default: {},
  primary: {
    backgroundColor: TURQUOISE,
    borderRadius: 100,
    elevation: 2,
  },
  icon: {
    textAlign: "center",
  },
});

export default IconButton;

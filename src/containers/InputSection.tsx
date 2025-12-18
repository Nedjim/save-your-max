import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DARK_GREY, WHITE } from "../constants/colors";
import IconButton from "../components/IconButton";

type InputSectionProps = {
  value: string;
  onChange: (key: string) => void;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
};

const InputSection = (props: InputSectionProps) => {
  const { onChange, value, label, ...rest } = props;
  const id = label.replace(/ /g, "_").toLocaleLowerCase();

  const clearValue = () => {
    onChange("");
  };

  return (
    <View style={styles.section}>
      <Text style={styles.label} nativeID={id}>
        {label}
      </Text>
      <TextInput
        id={id}
        style={styles.input}
        accessibilityLabel="input"
        accessibilityLabelledBy={id}
        onChangeText={onChange}
        value={value}
        {...rest}
      />
      <View style={[!value.length && styles.hidden]}>
        <IconButton
          name="close"
          onPress={clearValue}
          size={12}
          color={DARK_GREY}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: 60,
    color: WHITE,
  },
  input: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: WHITE,
  },
  hidden: {
    visibility: "hidden",
  },
});

export default InputSection;

import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import IconButton from '../../components/IconButton';
import { DARK_GREY, WHITE } from '../../constants/colors';

type InputProps = {
  value: string;
  onChange: (key: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  id: string;
};

const Input = (props: InputProps) => {
  const { onChange, value, id, ...rest } = props;

  const clearValue = () => {
    onChange('');
  };

  return (
    <View style={styles.section}>
      <TextInput
        id={id}
        style={styles.input}
        accessibilityLabel="input"
        accessibilityLabelledBy={id}
        onChangeText={onChange}
        value={value}
        {...rest}
      />
      <View style={[styles.clearInput, !value.length && styles.hidden]}>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: WHITE,
  },
  clearInput: {
    position: 'absolute',
    right: 16,
  },
  hidden: {
    opacity: 0,
  },
});

export default Input;

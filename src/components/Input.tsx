import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { WHITE } from '@/src/constants/colors';
import IconButton from './IconButton';

type InputProps = {
  value?: string;
  onChange: (key: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  placeholder?: string;
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
        placeholderTextColor="#7A8699"
        autoCapitalize="none"
        {...rest}
      />
      <View style={[styles.clearInput, !value?.length && styles.hidden]}>
        <IconButton name="close" onPress={clearValue} size={12} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(20, 30, 40, 0.6)',
    color: WHITE,
    borderRadius: 8,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
  clearInput: {
    position: 'absolute',
    right: 4,
  },
  hidden: {
    opacity: 0,
  },
});

export default Input;

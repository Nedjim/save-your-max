import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { WHITE } from '@/src/constants/colors';

type InputProps = {
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  id: string;
};

const UserInput = (props: InputProps) => {
  const { value, id, ...rest } = props;

  return (
    <View style={styles.section}>
      <TextInput
        id={id}
        style={styles.input}
        accessibilityLabel="input"
        accessibilityLabelledBy={id}
        value={value}
        placeholderTextColor="#7A8699"
        autoCapitalize="none"
        editable={false}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
});

export default UserInput;

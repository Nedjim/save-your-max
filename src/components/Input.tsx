import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { WHITE } from '@/src/constants/colors';

export type TextContentType = 'password' | 'emailAddress' | 'none';

type InputProps = {
  value?: string;
  onChange?: (key: string) => void;
  textContentType?: TextContentType;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  maxLength?: number;
  placeholder?: string;
  editable?: boolean;
  id: string;
};

const Input = (props: InputProps) => {
  const {
    onChange,
    value,
    id,
    secureTextEntry = false,
    textContentType = 'none',
    editable = true,
    ...rest
  } = props;
  const [passewordVisible, setPasswordVisible] = useState(secureTextEntry);

  const clearValue = () => {
    onChange?.('');
  };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passewordVisible);
  };

  return (
    <View style={styles.section}>
      <TextInput
        id={id}
        style={styles.input}
        accessibilityLabelledBy={id}
        onChangeText={onChange}
        value={value}
        textContentType={textContentType}
        secureTextEntry={passewordVisible}
        autoCorrect={false}
        editable={editable}
        accessibilityLabel="input"
        placeholderTextColor="#7A8699"
        autoCapitalize="none"
        autoComplete="off"
        {...rest}
      />
      <View style={[styles.clearInput, !value?.length && styles.hidden]}>
        <View style={styles.inputActions}>
          {textContentType === 'password' && (
            <Pressable style={styles.inputIcon} onPress={handlePasswordVisible}>
              <AntDesign
                name={passewordVisible ? 'eye' : 'eye-invisible'}
                size={12}
                color={WHITE}
              />
            </Pressable>
          )}
          {editable && (
            <Pressable
              style={[
                styles.inputIcon,
                (!editable || !value?.length) && styles.hidden,
              ]}
              onPress={clearValue}
            >
              <AntDesign name="close" size={12} color={WHITE} />
            </Pressable>
          )}
        </View>
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
  inputActions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputIcon: {
    padding: 6,
    borderRadius: 40,
    elevation: 2,
  },
});

export default Input;

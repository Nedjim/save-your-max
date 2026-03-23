import { StyleSheet, View } from 'react-native';
import Input from '@/src/components/Input';

type AuthInputsType = {
  email: string | null;
  password: string | null;
  confirmedPassword?: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmedPassword?: (passeword: string) => void;
};

function AuthInputs(props: AuthInputsType) {
  const {
    email,
    password,
    confirmedPassword,
    setEmail,
    setPassword,
    setConfirmedPassword,
  } = props;

  return (
    <View style={styles.inputs}>
      <Input
        id="email"
        placeholder="E-mail"
        value={email || ''}
        onChange={setEmail}
        textContentType="emailAddress"
      />
      <Input
        id="password"
        placeholder="Password"
        value={password || ''}
        onChange={setPassword}
        secureTextEntry={true}
        textContentType="password"
      />
      {setConfirmedPassword && (
        <Input
          id="confirmed-assword"
          placeholder="Confirmed password"
          value={confirmedPassword || ''}
          onChange={setConfirmedPassword}
          secureTextEntry={true}
          textContentType="password"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: 16,
  },
});

export default AuthInputs;

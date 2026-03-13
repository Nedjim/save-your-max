import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Input from '../components/Input';
import { MODAL_OPACITY, TURQUOISE, WHITE } from '../constants/colors';
import { useSignInUser, useSignUpUser } from '../hooks/auth';

const AuthPage = () => {
  const { mutate: signInUserMutation } = useSignInUser();
  const { mutate: signUpUserMutation } = useSignUpUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleSubmit = () => {
    if (mode === 'login') signIn();
    else signUp();
  };

  function signIn() {
    const payload = { email, password };
    signInUserMutation(payload);
  }

  function signUp() {
    const payload = { email, password };
    signUpUserMutation(payload);
  }

  return (
    <View style={styles.auth}>
      <View style={styles.form}>
        <Text style={styles.title}>
          {mode === 'login' ? 'Login' : 'Signup'}
        </Text>

        {/* WIP: <Text style={[styles.error, error && styles.visible]}>{error}</Text> */}
        <Input
          id="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          id="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
        <View style={styles.actions}>
          <Button
            title={mode === 'login' ? 'Go to Signup' : 'Go to Login'}
            onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
            color="#2A313B"
          />
          <Button
            title={mode === 'login' ? 'Login' : 'Signup'}
            onPress={handleSubmit}
            color={TURQUOISE}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  auth: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    width: 320,
    padding: 16,
    marginTop: 40,
    backgroundColor: MODAL_OPACITY,
    borderRadius: 8,
    gap: 8,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
    visibility: 'hidden',
  },
  visible: {
    visibility: 'block',
  },
});

export default AuthPage;

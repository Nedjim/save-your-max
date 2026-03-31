import { useSegments } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MODAL_OPACITY } from '../constants/colors';
import ConfirmForm from '../containers/auth/ResetPassword/ConfirmForm';
import Done from '../containers/auth/ResetPassword/Done';
import EmailSent from '../containers/auth/ResetPassword/EmailSent';
import RequestForm from '../containers/auth/ResetPassword/RequestForm';
import SigninForm from '../containers/auth/SigninForm';
import SignupForm from '../containers/auth/SignupForm';
import PageWrapper from '../containers/page/PageWrapper';
import { AuthMode } from '../types';

function AuthPage() {
  const segments = useSegments();
  const isResetPasswordConfirm = segments.some((s) => s === 'reset-password');
  const [mode, setMode] = useState<AuthMode>();

  let content = null;

  if (mode === 'signin') {
    content = <SigninForm setMode={setMode} />;
  }

  if (mode === 'signup') {
    content = <SignupForm setMode={setMode} />;
  }

  if (mode === 'resetPasswordRequest') {
    content = <RequestForm setMode={setMode} />;
  }

  if (mode === 'resetPasswordEmailSent') {
    content = <EmailSent setMode={setMode} />;
  }

  if (isResetPasswordConfirm) {
    content = <ConfirmForm setMode={setMode} />;
  }

  if (mode === 'resetPasswordDone') {
    content = <Done />;
  }

  return (
    <PageWrapper>
      <View style={styles.auth}>
        <View style={styles.form}>{content}</View>
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  auth: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    width: 320,
    padding: 20,
    marginTop: 40,
    backgroundColor: MODAL_OPACITY,
    borderRadius: 16,
    gap: 8,
  },
});

export default AuthPage;

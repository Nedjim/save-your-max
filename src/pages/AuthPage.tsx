import { useSegments } from 'expo-router';
import React, { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MODAL_OPACITY } from '../constants/colors';
import Done from '../containers/auth/Done';
import EmailSent from '../containers/auth/EmailSent';
import ResetPasswordConfirmForm from '../containers/auth/ResetPassword/ConfirmForm';
import ResetPasswordRequestForm from '../containers/auth/ResetPassword/RequestForm';
import SigninForm from '../containers/auth/Signin/RequestForm';
import SignupConfirmForm from '../containers/auth/Signup/ConfirmForm';
import SignupRequestForm from '../containers/auth/Signup/RequestForm';
import PageWrapper from '../containers/page/PageWrapper';
import { AuthMode } from '../types';

function AuthPage() {
  const segments = useSegments();
  const [mode, setMode] = useState<AuthMode>('signinRequest');
  const isResetPasswordConfirm = segments.some((s) => s === 'reset-password');
  const isResetEmailConfirm = segments.some((s) => s === 'reset-email');
  const isSignupConfirm = segments.some((s) => s === 'signup-confirm');

  const SCREENS: Record<AuthMode, ReactNode> = {
    signinRequest: <SigninForm setMode={setMode} />,
    signupRequest: <SignupRequestForm setMode={setMode} />,
    signupEmailSent: (
      <EmailSent
        setMode={setMode}
        subtitle="Please check your email to confirm your account."
      />
    ),
    signupConfirm: <SignupConfirmForm />,
    resetPasswordRequest: <ResetPasswordRequestForm setMode={setMode} />,
    resetPasswordEmailSent: (
      <EmailSent
        setMode={setMode}
        subtitle="If an account exists, you’ll receive a password reset link shortly. Please follow the instructions."
      />
    ),
    resetPasswordConfirm: <ResetPasswordConfirmForm setMode={setMode} />,
    resetPasswordDone: (
      <Done
        subtitle="Your password has been updated successfully. Please sign in with your
        new password."
      />
    ),
    resetEmailDone: (
      <Done subtitle="Your password has been updated successfully. Please sign in with you new Email." />
    ),
  };

  let content = null;

  if (isResetPasswordConfirm) {
    content = SCREENS['resetPasswordConfirm'];
  } else if (isSignupConfirm) {
    content = SCREENS['signupConfirm'];
  } else if (isResetEmailConfirm) {
    content = SCREENS['resetEmailDone'];
  } else {
    content = SCREENS[mode];
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

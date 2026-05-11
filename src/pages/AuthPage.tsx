import { useSegments } from 'expo-router';
import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { MODAL_OPACITY } from '../constants/colors';
import Done from '../containers/auth/Done';
import EmailSent from '../containers/auth/EmailSent';
import ResetPasswordConfirmForm from '../containers/auth/ResetPassword/ConfirmForm';
import ResetPasswordRequestForm from '../containers/auth/ResetPassword/RequestForm';
import SigninRequestForm from '../containers/auth/Signin/RequestForm';
import SignupConfirmForm from '../containers/auth/Signup/ConfirmForm';
import SignupRequestForm from '../containers/auth/Signup/RequestForm';
import { AuthMode } from '../types';

function AuthPage() {
  const segments = useSegments();
  const [mode, setMode] = useState<AuthMode>('signinRequest');
  const { t } = useTranslation();
  const isResetPasswordConfirm = segments.some((s) => s === 'reset-password');
  const isResetEmailConfirm = segments.some((s) => s === 'reset-email');
  const isSignupConfirm = segments.some((s) => s === 'signup-confirm');

  const SCREENS: Record<AuthMode, ReactNode> = {
    signinRequest: <SigninRequestForm setMode={setMode} />,
    signupRequest: <SignupRequestForm setMode={setMode} />,
    signupEmailSent: (
      <EmailSent
        setMode={setMode}
        description={t('auth.email_sent_signup_description')}
      />
    ),
    signupConfirm: <SignupConfirmForm />,
    resetPasswordRequest: <ResetPasswordRequestForm setMode={setMode} />,
    resetPasswordEmailSent: (
      <EmailSent
        setMode={setMode}
        description={t('auth.email_sent_reset_password_description')}
      />
    ),
    resetPasswordConfirm: <ResetPasswordConfirmForm setMode={setMode} />,
    resetPasswordDone: (
      <Done description={t('auth.reset_password_done_description')} />
    ),
    resetEmailDone: (
      <Done description={t('auth.reset_email_done_description')} />
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
    <View style={styles.auth}>
      <View style={styles.form}>{content}</View>
    </View>
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

import { useSegments } from 'expo-router';
import React from 'react';
import Auth from '../containers/forms/Auth.tsx';
import ResetPasswd from '../containers/forms/ResetPasswd';
import PageWrapper from '../containers/page/PageWrapper';

function AuthPage() {
  const segments = useSegments();

  const isResetPassword = segments.some((s) => s === 'reset-password');

  return (
    <PageWrapper>{isResetPassword ? <ResetPasswd /> : <Auth />}</PageWrapper>
  );
}

export default AuthPage;

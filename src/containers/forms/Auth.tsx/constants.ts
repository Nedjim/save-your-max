import { AuthMode } from '@/src/types';

export const TEXT_BY_MODE: Record<
  AuthMode,
  {
    title: string;
    subtitle: string;
    submitButtonTitle?: string;
    secondaryButtonTitle?: string;
  }
> = {
  signin: {
    title: 'Sign In',
    subtitle: 'Enter your email and password.',
    submitButtonTitle: 'Continue',
    secondaryButtonTitle: 'Create an account',
  },
  signup: {
    title: 'Sign Up',
    subtitle: 'Enter your email and password to create your account.',
    submitButtonTitle: 'Create',
    secondaryButtonTitle: 'Log in',
  },
  resetPassword: {
    title: 'Reset password',
    subtitle: 'Enter your email to receive a link to change your password.',
    submitButtonTitle: 'Apply',
    secondaryButtonTitle: 'Cancel',
  },
  resetPasswordSubmit: {
    title: 'Email successfuly sent',
    subtitle:
      'If an account exists, you’ll receive a password reset link shortly. Please follow the instructions.',
    secondaryButtonTitle: 'Cancel',
  },
};

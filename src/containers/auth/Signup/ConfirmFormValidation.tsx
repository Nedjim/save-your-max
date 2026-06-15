import { SignupError } from '@/src/errors/SignupError';
import { useSignupConfirmUser } from '@/src/hooks/auth';
import type { SignupErrorType } from '@/src/types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner-native';

const errorTranslationKeys: Record<SignupErrorType, string> = {
  SIGNUP_EXCHANGE_CODE_ERROR: 'auth.signup_exchange_code_error',
  SIGNUP_EXCHANGE_CODE_EMPTY_USER: 'auth.signup_exchange_empty_user',
  SIGNUP_CREATE_PROFILE_ERROR: 'auth.signup_create_profile_error',
};

type ConfirmFormValidationProps = {
  code: string;
};

function ConfirmFormValidation(props: ConfirmFormValidationProps) {
  const { code } = props;
  const { t } = useTranslation();
  const { mutateAsync: signupConfirmUserMutation } = useSignupConfirmUser();

  useEffect(() => {
    signupConfirmUserMutation(code)
      .then(() => {
        toast.success(t('auth.signup_create_profile_success'));
      })
      .catch((error: unknown) => {
        if (error instanceof SignupError) {
          toast.error(t(errorTranslationKeys[error.code]));
        } else {
          toast.error(t('errors.default'));
        }
      });
  }, [code, t, signupConfirmUserMutation]);

  return null;
}

export default ConfirmFormValidation;

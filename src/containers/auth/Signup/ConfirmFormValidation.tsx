import { useSignupConfirmUser } from '@/src/hooks/auth';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner-native';

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
      .catch((error) => {
        const { message } = error;

        switch (message) {
          case 'SIGNUP_EXCHANGE_CODE_ERROR':
            toast.error(t('auth.signup_exchange_code_error'));
            return;
          case 'SIGNUP_CREATE_PROFILE_ERROR':
            toast.error(t('auth.signup_create_profile_error'));
            return;
          default:
            toast.error(t('errors.default'));
            return;
        }
      });
  }, [code, t, signupConfirmUserMutation]);

  return null;
}

export default ConfirmFormValidation;

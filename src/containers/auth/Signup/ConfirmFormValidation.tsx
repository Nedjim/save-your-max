import Loader from '@/src/components/Loader';
import { useSignupConfirmUser } from '@/src/hooks/auth';
import { Text } from 'react-native';

type ConfirmFormValidationProps = {
  code: string;
};

function ConfirmFormValidation(props: ConfirmFormValidationProps) {
  const { code } = props;
  const { isLoading, isError, error } = useSignupConfirmUser(code);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  }

  if (!isLoading && isError) {
    content = <Text>{error.message}</Text>;
  }

  return <>{content}</>;
}

export default ConfirmFormValidation;

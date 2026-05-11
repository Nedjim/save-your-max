import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import UpdatePasswordModal from '../Modals/UpdatePassword';

function UpdatePasswordButton() {
  const [updatePassword, setUpdatePassword] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        accessibilityLabel={t('auth.reset_password_title')}
        onPress={() => setUpdatePassword(true)}
        mode="text"
      >
        {t('auth.reset_password_title')}
      </Button>
      {updatePassword && (
        <UpdatePasswordModal closeModal={() => setUpdatePassword(false)} />
      )}
    </>
  );
}

export default UpdatePasswordButton;

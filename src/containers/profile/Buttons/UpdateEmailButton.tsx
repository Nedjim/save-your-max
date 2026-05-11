import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import UpdateEmailModal from '../Modals/UpdateEmail';

function UpdateEmailButton() {
  const [updateEmail, setUpdateEmail] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        accessibilityLabel={t('auth.reset_email_title')}
        onPress={() => setUpdateEmail(true)}
        mode="text"
      >
        {t('auth.reset_email_title')}
      </Button>
      {updateEmail && (
        <UpdateEmailModal closeModal={() => setUpdateEmail(false)} />
      )}
    </>
  );
}

export default UpdateEmailButton;

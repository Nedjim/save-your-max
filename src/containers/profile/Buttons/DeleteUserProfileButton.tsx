import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import DeleteProfileModal from '../Modals/DeleteModal';
import { ERROR } from '@/src/constants/colors';

function DeleteUserProfileButton() {
  const [deleteProfile, setDeleteProfile] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        labelStyle={{ color: ERROR }}
        accessibilityLabel={t('auth.delete_account_title')}
        mode="text"
        onPress={() => {
          setDeleteProfile(true);
        }}
      >
        {t('auth.delete_account_title')}
      </Button>
      {deleteProfile && (
        <DeleteProfileModal
          closeModal={() => {
            setDeleteProfile(false);
          }}
        />
      )}
    </>
  );
}

export default DeleteUserProfileButton;

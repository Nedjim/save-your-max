import { useState } from 'react';
import { Button } from 'react-native-paper';
import DeleteProfileModal from '../Modals/DeleteModal';
import { ERROR } from '@/src/constants/colors';

function DeleteUserProfileButton() {
  const [deleteProfile, setDeleteProfile] = useState(false);

  return (
    <>
      <Button
        labelStyle={{ color: ERROR }}
        accessibilityLabel="Delete account"
        mode="text"
        onPress={() => {
          setDeleteProfile(true);
        }}
      >
        Delete account
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

import { useState } from 'react';
import { Button } from 'react-native-paper';
import UpdatePasswordModal from '../Modals/UpdatePassword';

function UpdatePasswordButton() {
  const [updatePassword, setUpdatePassword] = useState(false);

  return (
    <>
      <Button onPress={() => setUpdatePassword(true)} mode="text">
        Change password
      </Button>
      {updatePassword && (
        <UpdatePasswordModal closeModal={() => setUpdatePassword(false)} />
      )}
    </>
  );
}

export default UpdatePasswordButton;

import { useState } from 'react';
import { Button } from 'react-native-paper';
import UpdateEmailModal from '../Modals/UpdateEmail';

function UpdateEmailButton() {
  const [updateEmail, setUpdateEmail] = useState(false);

  return (
    <>
      <Button onPress={() => setUpdateEmail(true)} mode="text">
        Change email address
      </Button>
      {updateEmail && (
        <UpdateEmailModal closeModal={() => setUpdateEmail(false)} />
      )}
    </>
  );
}

export default UpdateEmailButton;

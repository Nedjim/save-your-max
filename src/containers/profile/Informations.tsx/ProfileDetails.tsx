import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import UpdateEmailButton from '../Buttons/UpdateEmailButton';
import UpdatePasswordButton from '../Buttons/UpdatePasswordButton';
import Divider from '@/src/components/Divider';
import FormErrors from '@/src/components/Form/Errors';
import { DARK_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useUpdateProfile } from '@/src/hooks/profile';
import { updateProfileSchema } from '@/src/schemas/profile/editProfile.schema';
import { Profile, UpdateProfileFormValues } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import UserProfileInformationsFields from './Fields';

type ProfileDetailsProps = {
  profile: Profile;
  refetch: () => void;
};

function ProfileDetails(props: ProfileDetailsProps) {
  const { profile, refetch } = props;

  const { mutateAsync: updateProfileMutation } = useUpdateProfile();
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile.name || '',
      surname: profile.surname || '',
      pseudo: profile.pseudo || '',
    },
  });
  const [success, setSuccess] = useState(false);
  const isSubmitDisabled = !isDirty || isSubmitting;

  const onSubmit = async (data: UpdateProfileFormValues) => {
    try {
      await updateProfileMutation(data);
      refetch();
      reset(data);
      setSuccess(true);
    } catch {
      setError('root', {
        type: 'server',
        message: 'Update profile error',
      });
    }
  };

  return (
    <>
      <FormErrors control={control} />
      {success && <Text>Your information have been sucessfuly updated!</Text>}
      <UserProfileInformationsFields control={control} />
      <View style={styles.action}>
        <Button
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: isSubmitDisabled ? DARK_GREY : TURQUOISE,
          }}
          labelStyle={{ color: WHITE }}
          disabled={isSubmitDisabled}
          loading={isSubmitting}
        >
          Save changes
        </Button>
        <Divider />
        <UpdateEmailButton />
        <UpdatePasswordButton />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  action: {
    marginTop: 12,
  },
});

export default ProfileDetails;

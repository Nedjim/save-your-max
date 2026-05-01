import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { toast } from 'sonner-native';
import UpdateEmailButton from '../Buttons/UpdateEmailButton';
import UpdatePasswordButton from '../Buttons/UpdatePasswordButton';
import Divider from '@/src/components/Divider';
import { DARK_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useUpdateProfile } from '@/src/hooks/profile';
import { updateProfileSchema } from '@/src/schemas/profile/editProfile.schema';
import {
  Profile,
  UpdateProfileFormErrors,
  UpdateProfileFormValues,
} from '@/src/types';
import { toastFormFieldError } from '@/src/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import UserProfileFieldsController from './FieldsController';

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
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile.name,
      surname: profile.surname,
      pseudo: profile.pseudo,
      birthday: profile.birthday,
    },
  });

  const isSubmitDisabled = !isDirty || isSubmitting;

  const onSubmit = async (data: UpdateProfileFormValues) => {
    try {
      await updateProfileMutation(data);
      refetch();
      reset(data);
      toast.success('Updated successfully!');
    } catch {
      toast.error('Something went wrong');
    }
  };

  const onError = (errors: UpdateProfileFormErrors) => {
    const firstError = Object.entries(errors)[0];

    toastFormFieldError(firstError);
    reset();
  };

  return (
    <>
      <UserProfileFieldsController control={control} />
      <View>
        <Button
          onPress={handleSubmit(onSubmit, onError)}
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

export default ProfileDetails;

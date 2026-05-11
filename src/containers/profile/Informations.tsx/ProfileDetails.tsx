import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { toast } from 'sonner-native';
import SaveProfileButton from '../Buttons/SaveProfileButton';
import UpdateEmailButton from '../Buttons/UpdateEmailButton';
import UpdatePasswordButton from '../Buttons/UpdatePasswordButton';
import Divider from '@/src/components/Divider';
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
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile.name,
      surname: profile.surname,
      pseudo: profile.pseudo,
      birthday: profile.birthday,
    },
  });

  const onSubmit = async (data: UpdateProfileFormValues) => {
    try {
      await updateProfileMutation(data);
      refetch();
      reset(data);
      toast.success(t('success.saved'));
    } catch {
      toast.error(t('errors.default'));
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
        <SaveProfileButton
          onPress={() => handleSubmit(onSubmit, onError)}
          control={control}
        />
        <Divider />
        <UpdateEmailButton />
        <UpdatePasswordButton />
      </View>
    </>
  );
}

export default ProfileDetails;

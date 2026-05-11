import { Control, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { DARK_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { UpdateProfileFormValues } from '@/src/types';

type SaveProfileButtonProps = {
  onPress: () => void;
  control: Control<UpdateProfileFormValues>;
};

function SaveProfileButton(props: SaveProfileButtonProps) {
  const { onPress, control } = props;
  const { isDirty, isSubmitting } = useFormState({ control });
  const { t } = useTranslation();

  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <Button
      accessibilityLabel={t('actions.save')}
      onPress={onPress}
      style={{
        backgroundColor: isSubmitDisabled ? DARK_GREY : TURQUOISE,
      }}
      labelStyle={{ color: WHITE }}
      disabled={isSubmitDisabled}
      loading={isSubmitting}
    >
      {t('actions.save')}
    </Button>
  );
}

export default SaveProfileButton;

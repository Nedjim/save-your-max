import { Control, Controller, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import DatePicker from '@/src/components/DatePicker';
import Label from '@/src/components/Label';
import { WHITE } from '@/src/constants/colors';
import { UpdateProfileFormValues } from '@/src/types';
import { today } from '@/src/utils/date';

const MIN_AGE = 13;
const MAX_AGE = 120;

const maximumDate = new Date(
  today.getFullYear() - MIN_AGE,
  today.getMonth(),
  today.getDate(),
);

const minimumDate = new Date(
  today.getFullYear() - MAX_AGE,
  today.getMonth(),
  today.getDate(),
);

const TEXT_FIELDS: Path<Omit<UpdateProfileFormValues, 'birthday'>>[] = [
  'name',
  'surname',
  'pseudo',
];

type UserProfileFieldsControllerProps = {
  control: Control<UpdateProfileFormValues>;
};

function UserProfileFieldsController(props: UserProfileFieldsControllerProps) {
  const { control } = props;
  const { t } = useTranslation();

  return (
    <>
      {TEXT_FIELDS.map((key) => {
        const formattedId = `user-profile-${key}`;

        return (
          <View style={styles.field} key={formattedId}>
            <Label label={t(`profile.${key}`)} nativeId={formattedId} />
            <Controller
              key={formattedId}
              control={control}
              name={key}
              render={({ field: { value, onChange } }) => {
                return (
                  <TextInput
                    id={formattedId}
                    placeholder={t(`profile.${key}_placeholder`)}
                    style={styles.input}
                    accessibilityLabelledBy={formattedId}
                    onChangeText={onChange}
                    value={value}
                    autoCorrect={false}
                    accessibilityLabel="input"
                    placeholderTextColor="#7A8699"
                    autoCapitalize="none"
                    autoComplete="off"
                  />
                );
              }}
            />
          </View>
        );
      })}
      <View style={[styles.field, styles.datePicker]}>
        <Label
          label={t('profile.date_of_birth')}
          nativeId="user-profile-date-of-birth"
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field: { value, onChange } }) => {
            const date = value ? new Date(value) : today;

            return (
              <DatePicker
                date={date}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                onChange={(newDate) => {
                  onChange(newDate.toISOString());
                }}
              />
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    display: 'flex',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(20, 30, 40, 0.6)',
    borderColor: 'rgba(255,255,255,0.1)',
    color: WHITE,
  },
});

export default UserProfileFieldsController;

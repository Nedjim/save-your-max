import { Control, Controller, Path } from 'react-hook-form';
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

type UserProfileFieldsControllerProps = {
  control: Control<UpdateProfileFormValues>;
};

type UserProfileField = {
  name: Path<UpdateProfileFormValues>;
  label: string;
  placeholder?: string;
};

const DEFAULT_TEXT_FIELDS: UserProfileField[] = [
  { placeholder: 'Ex: John', label: 'First name', name: 'name' },
  { placeholder: 'Ex: Doe', label: 'Last name', name: 'surname' },
  {
    placeholder: 'Ex: Mimi Siku',
    label: 'Pseudo',
    name: 'pseudo',
  },
];

function UserProfileFieldsController(props: UserProfileFieldsControllerProps) {
  const { control } = props;

  return (
    <>
      {DEFAULT_TEXT_FIELDS.map((field) => {
        const { name, label, placeholder } = field;
        const formattedId = `user-profile-${name}`;

        return (
          <View style={styles.field} key={formattedId}>
            <Label label={label} nativeId={formattedId} />
            <Controller
              key={formattedId}
              control={control}
              name={name}
              render={({ field: { value, onChange } }) => {
                return (
                  <TextInput
                    id={formattedId}
                    placeholder={placeholder}
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
        <Label label="Date of birth" nativeId="user-profile-birthday" />
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

import { Control, Controller, Path } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import Label from '@/src/components/Label';
import { WHITE } from '@/src/constants/colors';
import { UpdateProfileFormValues } from '@/src/types';

type UserProfileInformationsFieldsProps = {
  control: Control<UpdateProfileFormValues>;
};

type UserProfileField = {
  name: Path<UpdateProfileFormValues>;
  label: string;
  placeholder?: string;
};

const USER_PROFILE_DEFAULT_FIELDS: UserProfileField[] = [
  { placeholder: 'Ex: John', label: 'First name', name: 'name' },
  { placeholder: 'Ex: Doe', label: 'Last name', name: 'surname' },
  {
    placeholder: 'Ex: Mimi Siku',
    label: 'Pseudo',
    name: 'pseudo',
  },
  // {
  //   placeholder: 'Ex: 21/06/1991',
  //   label: 'Bithday',
  //   name: 'birthday',
  // },
];

function UserProfileInformationsFields(
  props: UserProfileInformationsFieldsProps,
) {
  const { control } = props;

  return USER_PROFILE_DEFAULT_FIELDS.map((field) => {
    const { name, label, placeholder } = field;
    const formattedId = `user-profile-${name}`;

    return (
      <View style={styles.field} key={formattedId}>
        <Label label={label} nativeId={formattedId} />
        <Controller
          key={formattedId}
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
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
          )}
        />
      </View>
    );
  });
}

const styles = StyleSheet.create({
  field: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(20, 30, 40, 0.6)',
    color: WHITE,
    borderRadius: 8,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
});

export default UserProfileInformationsFields;

import { Control, Controller, Path } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Input from '@/src/components/Input';
import { RequestFormValues } from '@/src/types';

type UpdatePasswordFieldType = {
  name: Path<RequestFormValues>;
  placeholder: string;
  textContentType: 'password';
};

const UPDATE_PASSWORD_FIELDS: UpdatePasswordFieldType[] = [
  {
    name: 'password',
    placeholder: 'New password',
    textContentType: 'password',
  },
  {
    name: 'confirmedPassword',
    placeholder: 'Confirmed password',
    textContentType: 'password',
  },
];

type UpdatePasswordFieldsProps = {
  control: Control<RequestFormValues>;
};

const UpdatePasswordFields = (props: UpdatePasswordFieldsProps) => {
  const { control } = props;

  return (
    <View style={styles.fields}>
      {UPDATE_PASSWORD_FIELDS.map((field) => {
        const { name, placeholder, textContentType } = field;

        return (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
              <Input
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                textContentType={textContentType}
                secureTextEntry={true}
              />
            )}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  fields: {
    gap: 16,
    marginVertical: 16,
  },
});

export default UpdatePasswordFields;

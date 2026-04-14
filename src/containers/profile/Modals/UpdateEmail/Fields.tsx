import { Control, Controller, Path } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Input, { TextContentType } from '@/src/components/Input';
import { UpdatedEmailFormValues } from '@/src/types';

type UpdateEmailField = {
  name: Path<UpdatedEmailFormValues>;
  placeholder: string;
  textContentType: TextContentType;
};

const FIELDS: UpdateEmailField[] = [
  {
    name: 'email',
    placeholder: 'New e-mail',
    textContentType: 'emailAddress',
  },
  {
    name: 'confirmedEmail',
    placeholder: 'Confirmed e-mail',
    textContentType: 'emailAddress',
  },
];

type UpdateEmailFieldsProps = {
  control: Control<UpdatedEmailFormValues>;
};

const UpdateEmailFields = (props: UpdateEmailFieldsProps) => {
  const { control } = props;

  return (
    <View style={styles.fields}>
      {FIELDS.map((field) => {
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

export default UpdateEmailFields;

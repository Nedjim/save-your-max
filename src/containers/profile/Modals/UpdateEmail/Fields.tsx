import { Control, Controller, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Input, { TextContentType } from '@/src/components/Input';
import { UpdatedEmailFormValues } from '@/src/types';

type UpdateEmailField = {
  name: Path<UpdatedEmailFormValues>;
  textContentType: TextContentType;
};

const FIELDS: UpdateEmailField[] = [
  {
    name: 'email',
    textContentType: 'emailAddress',
  },
  {
    name: 'confirmedEmail',
    textContentType: 'emailAddress',
  },
];

type UpdateEmailFieldsProps = {
  control: Control<UpdatedEmailFormValues>;
};

const UpdateEmailFields = (props: UpdateEmailFieldsProps) => {
  const { control } = props;
  const { t } = useTranslation();

  return (
    <View style={styles.fields}>
      {FIELDS.map((field) => {
        const { name, textContentType } = field;

        return (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
              <Input
                id={name}
                placeholder={t(`auth.field_${name}`)}
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
